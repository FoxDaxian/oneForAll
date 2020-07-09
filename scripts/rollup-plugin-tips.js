const ora = require('./ora');

module.exports = function myExample({root, dist} = {}) {
    let oraInstance;
    return {
        name: 'rollup-plugin-clear',
        buildStart(inputOpt) {
            oraInstance = ora('build start');
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
                console.log(`\u001b[31m \nbuild error \u001b[0m`);
                console.log(`\u001b[31m ========== \u001b[0m`);
                console.log(`\u001b[31m ${err} \u001b[0m`);
                console.log(`\u001b[31m ========== \u001b[0m`);
                oraInstance && oraInstance.stop();
                return console.log('compiler error');
            }
            oraInstance && oraInstance.update('compiler completed');
            
        }
    };
};
