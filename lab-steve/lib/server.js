'use strict';

const http = require('http');
const router = require('./router.js');
const routes = require('../route/routes.js');

let server = module.exports = {};

//create an object to store beers in
server.storage = {};


//create server, passing in router.route from the router object created in ./router.js
server.http = http.createServer(router.route);
