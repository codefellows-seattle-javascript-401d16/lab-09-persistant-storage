'use strict';

const http = require('http');
const uuid = require('uuid');
const router = require('./router.js');

require('../route/insta-router.js');

const server = module.exports = http.createServer(router.route);
