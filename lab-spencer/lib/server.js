'use strict';

const http = require('http');
const router = require('./router.js');
require('../route/seahawk-router.js');
module.exports = http.createServer(router.route);
