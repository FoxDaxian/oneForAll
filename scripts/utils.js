const glob = require('glob');
const path = require('path');

function getEntry(src) {
    return src || 'index.ts';
}

function getPkg() {
    return glob.sync(path.join(process.cwd(), 'packages', '*'));
}

module.exports = {
    getEntry,
    getPkg
};
