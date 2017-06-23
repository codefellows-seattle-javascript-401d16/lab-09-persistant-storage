'use strict';

const http = require('http');
const router = require('./router.js');
require('../route/user-router.js');

const server = module.exports = http.createServer(router.route);
