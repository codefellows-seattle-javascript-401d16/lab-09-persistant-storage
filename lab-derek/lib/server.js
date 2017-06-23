'use strict';

const http = require('http');
const requestParse = require('./request-parse.js');
const router = require('./router.js');
const Task = require('../model/task.js');

const server = module.exports = http.createServer(router.route);
