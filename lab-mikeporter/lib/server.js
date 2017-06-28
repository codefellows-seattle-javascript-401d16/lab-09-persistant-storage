'use strict';

const http = require('http');
const router = require('./router.js');
require('../route/noteRouter.js');

const server = module.exports = http.createServer(router.path);
