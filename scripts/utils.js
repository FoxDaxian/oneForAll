const glob = require('glob');
const path = require('path');
function getPkg() {
    return glob.sync(path.join(process.cwd(), 'packages', '*'));
}

module.exports = {
    getPkg
};
