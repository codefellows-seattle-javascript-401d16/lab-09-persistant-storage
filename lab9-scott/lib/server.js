'use strict';

const http = require('http');
const router = require('./router.js');
//require our routes
require('../route/profile-router.js');

const server = module.exports = http.createServer(router.route);
