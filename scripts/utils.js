const glob = require('glob');
const path = require('path');

// function sum(a, b) {
//     return a + b;
// }
function getPkg() {
    return glob.sync(path.join(process.cwd(), 'packages', '*'));
}

module.exports = {
    // sum,
    getPkg
};
