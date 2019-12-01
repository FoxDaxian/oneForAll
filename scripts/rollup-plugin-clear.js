const path = require('path');
const rimraf = require('rimraf');

module.exports = function myExample({root, dist} = {}) {
    return {
        name: 'rollup-plugin-clear',
        buildStart() {
            const outputDir = path.join(root, dist);
            rimraf.sync(outputDir);
        }
    };
};
