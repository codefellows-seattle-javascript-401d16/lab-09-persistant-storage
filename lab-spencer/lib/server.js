'use strict';

const http = require('http');
const Seahawk = require('../model/seahawk.js');
const router = require('./router.js');
const uuid = require('uuid');

let team = {
  players: {},
};



module.exports = http.createServer(router.route);
