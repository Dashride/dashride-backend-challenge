'use strict';

const pkg = require('../../package.json');
const bunyan = require('bunyan');

module.exports = bunyan.createLogger({ name: pkg.name });
