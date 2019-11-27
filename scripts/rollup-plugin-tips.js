const ora = require('./ora');

module.exports = function myExample({root, dist} = {}) {
    let oraInstance = ora('build start');
    return {
        name: 'rollup-plugin-clear',
        buildStart(inputOpt) {
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
                console.log('==========');
                console.log(err);
                console.log('==========');
                oraInstance && oraInstance.stop();
                return console.log('compiler error');
            }
            oraInstance && oraInstance.update('compiler completed');
        }
    };
};
