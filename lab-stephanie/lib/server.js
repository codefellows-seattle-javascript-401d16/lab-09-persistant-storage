'use strict';

const http = require('http');
const router = require('./router.js');

require('../lib/fbpost-router.js');

module.exports = http.createServer(router.route);
