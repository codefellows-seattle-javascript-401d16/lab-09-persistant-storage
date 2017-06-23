'use strict';

// node modules
const http = require('http');
// npm modules
const uuid = require('uuid');
// app modules
const router = require('./router.js');


// require our routes
require('../route/note-router.js')

// create server
const server = module.exports = http.createServer(router.route);
