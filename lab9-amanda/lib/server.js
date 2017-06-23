'use strict'

const http = require('http');
const uuid = require('uuid');
const router = require('../lib/router.js');
require('../route/note-router.js');

const server = module.exports = http.createServer(router.route);



// how we did it first
//http.createServer((req, res) => {
  //router.route(req,res)
//})
