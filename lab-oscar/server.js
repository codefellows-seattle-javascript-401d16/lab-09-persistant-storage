'use strict';

const server = require('./lib/server.js');
const PORT = 3000; //port we are using for our server

server.listen(PORT, ()=> console.log('Server is running on Port: ', PORT));
