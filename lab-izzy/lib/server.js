'use strict';

// first require node modules
const http = require('http');

// next require npm modules
const uuid = require('uuid');

// then require app modules
const router = require('./router.js');


// require our routes
require('../route/insta-router.js');

// create server
const server = module.exports = http.createServer(router.route);
