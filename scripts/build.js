const buildTask = require('./buildTask');

process.env.NODE_ENV = 'production';

buildTask();
