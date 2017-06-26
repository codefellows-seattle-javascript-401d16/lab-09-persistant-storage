'use strict';

// node modules
const http = require('http');
// npm modules
const uuid = require('uuid');
// app modules
const router = require('./router.js');


// require our routes
require('../route/game-router.js')

// create server
module.exports = http.createServer(router.route);
