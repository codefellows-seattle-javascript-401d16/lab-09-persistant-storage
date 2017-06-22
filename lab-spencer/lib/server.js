'use strict';

const http = require('http');
const router = require('./router.js');
require('../router/seahawk-router.js');
module.exports = http.createServer(router.route);
