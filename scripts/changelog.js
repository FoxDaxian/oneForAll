const fs = require('fs');
var conventionalChangelog = require('conventional-changelog');
conventionalChangelog({
    preset: 'angular'
}).pipe(fs.createWriteStream('CHANGELOG.md'));
