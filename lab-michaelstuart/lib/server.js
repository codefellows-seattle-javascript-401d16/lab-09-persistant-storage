'use strict';

const http = require('http');
const router = require('./router');

require('../route/user-router.js');

module.exports = http.createServer(router.route);
