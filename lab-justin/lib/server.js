'use strict';

// node modules
const http = require('http');

// app modules
const router = require('./router.js');


// require our routes
require('../route/feeling-router.js');

// create our server
module.exports = http.createServer(router.route);
