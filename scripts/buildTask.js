const rollup = require('rollup');
const utils = require('./utils');
const path = require('path');
// 用babel来支持ts
const vue = require('rollup-plugin-vue');
const resolveNpmModule = require('rollup-plugin-node-resolve');
const js2es6 = require('rollup-plugin-commonjs');
const buble = require('@rollup/plugin-buble');
const alias = require('@rollup/plugin-alias');
// 提取css
// const css = require('rollup-plugin-css-only');
const babel = require('rollup-plugin-babel');
const myPlugin = require('./plugina.js');

const extensions = ['.js', '.ts', '.vue'];

const inputPlugin = [
    alias({resolve: extensions}),
    js2es6({
        include: 'node_modules/**',
        exclude: ['packages/**', 'demo/**'],
        extensions
    }),
    resolveNpmModule({
        extensions
    }),
    // css(),
    vue({
        css: true
    }),
    babel({
        extensions, // https://github.com/rollup/rollup-plugin-babel/issues/260
        runtimeHelpers: true,
        include: ['packages/**/*.ts', 'packages/**/*.js', 'packages/**/*.vue'],
        exclude: 'node_modules/**'
    }),
    buble(), // https://github.com/vuejs/rollup-plugin-vue/issues/262
    myPlugin()
];
const outputPlugin = [];

async function devBuildTask(input, output) {
    const watcher = await rollup.watch({
        ...input,
        output
    });
    watcher.on('event', event => {
        if (event.code === 'END') {
            console.log('构建结束');
        }
        // console.log(event);
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

    const input = {
        input: path.join(pkg, buildOpt.input.src),
        plugins: inputPlugin,
        external
    };
    const output = buildOpt.output.map(outputConf => ({
        file: path.join(pkg, outputConf.dist),
        format: outputConf.format,
        name: outputConf.name || '',
        globals,
        sourcemap: false,
        outputPlugin
    }));

    if (process.env.NODE_ENV === 'production') {
        await prodBuildTask(input, output);
    } else if (process.env.NODE_ENV === 'development') {
        output.sourcemap = true;
        await devBuildTask(input, output);
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
