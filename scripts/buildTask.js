const rollup = require('rollup');
const utils = require('./utils');
const path = require('path');
// 用babel来支持ts
const vue = require('rollup-plugin-vue');
const resolveNpmModule = require('rollup-plugin-node-resolve');
const js2es6 = require('rollup-plugin-commonjs');
const buble = require('@rollup/plugin-buble');
const alias = require('@rollup/plugin-alias');
const {uglify} = require('rollup-plugin-uglify');
const postcss = require('rollup-plugin-postcss');
const babel = require('rollup-plugin-babel');
const clear = require('./rollup-plugin-clear.js');
const tips = require('./rollup-plugin-tips');

const extensions = ['.js', '.ts', '.vue'];

const inputPluginObj = {
    beforeVue: [
        tips(),
        alias({resolve: extensions}),
        js2es6({
            include: 'node_modules/**',
            exclude: ['packages/**', 'demo/**'],
            extensions
        }),
        resolveNpmModule({
            extensions
        })
    ],
    vue: [
        vue({
            css: false
        })
    ],
    afterVue: [
        babel({
            extensions, // https://github.com/rollup/rollup-plugin-babel/issues/260
            runtimeHelpers: true,
            include: [
                'packages/**/*.ts',
                'packages/**/*.js',
                'packages/**/*.vue'
            ],
            exclude: 'node_modules/**'
        }),
        buble() // https://github.com/vuejs/rollup-plugin-vue/issues/262
    ]
};
const generateInputPlugin = env => {
    const isProd = env === 'production';
    inputPluginObj.afterVue.unshift(
        postcss({
            extensions: ['.css', '.sss', '.pcss', '.scss', '.sass'],
            minimize: isProd
        })
    );
    if (isProd) {
        inputPluginObj.afterVue.push(uglify());
    }

    return [
        ...inputPluginObj.beforeVue,
        ...inputPluginObj.vue,
        ...inputPluginObj.afterVue
    ];
};
const outputPlugin = [];

async function devBuildTask(input, output) {
    const watcher = await rollup.watch({
        ...input,
        output
    });
    watcher.on('event', event => {
        switch (event.code) {
            case 'END':
                console.log('build completed');
                break;
            case 'ERROR':
                break;
            case 'FATAL':
                watcher.close();
                break;
        }
    });
}

async function prodBuildTask(input, output) {
    const bundle = await rollup.rollup(input);
    output.forEach(async each => await bundle.write(each));
}

// 当前 build 和 watch 是全部
async function buildWorker(pkg, nextBuildTask) {
    const pkgJson = require(path.join(pkg, 'package.json'));
    const buildOpt = pkgJson.buildOpt;
    const peerDependencies = pkgJson.peerDependencies;
    let external, globals;
    if (buildOpt.external && buildOpt.globals) {
        external = buildOpt.external;
        globals = buildOpt.globals;
    } else {
        external = peerDependencies ? Object.keys(peerDependencies) : [];
        globals = Object.assign.apply(
            null,
            external.map(packName => ({[packName]: packName}))
        );
    }

    const generateOutput = env => {
        const isProd = env === 'production';
        inputPluginObj.beforeVue.unshift(
            clear({
                root: pkg,
                dist: buildOpt.output[0].dist.split('/')[0]
            })
        );
        return buildOpt.output.map(outputConf => {
            return {
                file: path.join(pkg, outputConf.dist),
                format: outputConf.format,
                name: outputConf.name || '',
                globals,
                sourcemap: !isProd,
                outputPlugin
            };
        });
    };
    const generateInput = inputPlugin => {
        return {
            input: path.join(pkg, buildOpt.input.src),
            plugins: inputPlugin,
            external
        };
    };

    if (process.env.NODE_ENV === 'production') {
        const output = generateOutput('production');
        const inputPlugin = generateInputPlugin('production');
        await prodBuildTask(generateInput(inputPlugin), output);
    } else if (process.env.NODE_ENV === 'development') {
        const output = generateOutput('development');
        const inputPlugin = generateInputPlugin('development');
        await devBuildTask(generateInput(inputPlugin), output);
    }

    return nextBuildTask();
}

async function buildTask(taskCompletedFn) {
    const pkgs = utils.getPkg();
    let len;
    if (!(len = pkgs.length)) {
        return;
    }

    let index = -1;
    return await build(0);

    async function build(i) {
        index = i;
        if (i === len) {
            return taskCompletedFn && taskCompletedFn();
        }
        const fn = buildWorker.bind(null, pkgs[i]); // 构建方法
        return await fn(build.bind(null, i + 1));
    }
}

module.exports = buildTask;
