'use strict';

const http = require('http');
const Burger = require('../model/burger.js');
const router = require('./router.js');
const routes = require('../route/burger-route.js');
const server = module.exports = http.createServer(router.route);