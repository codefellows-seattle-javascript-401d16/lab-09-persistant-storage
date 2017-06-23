'use strict';

const http = require('http');
const router = require('../route/router.js');
require('../route/routes.js');
module.exports = http.createServer(router.route);
