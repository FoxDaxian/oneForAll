const path = require('path');
const rimraf = require('rimraf');
const ora = require('./ora');

module.exports = function myExample({root, dist} = {}) {
    let oraInstance = ora('build start');
    return {
        name: 'rollup-plugin-clear',
        buildStart(inputOpt) {
            const outputDir = path.join(root, dist);
            rimraf.sync(outputDir);
        },
        generateBundle() {
            oraInstance && oraInstance.update('generate completed');
        },
        renderStart() {
            oraInstance && oraInstance.update('building');
        },
        renderError(err) {
            oraInstance && oraInstance.update('build error');
            console.log(err);
        },
        writeBundle(bundle) {
            oraInstance && oraInstance.update('write Completed');
            oraInstance && oraInstance.stop();
        },
        buildEnd(err) {
            if (err) {
                oraInstance && oraInstance.update('compiler error');
                console.log(err);
            }
            oraInstance && oraInstance.update('compiler completed');
        }
    };
};
