const http = require('http');
const router = require('./router.js');
const beerListRoutes = require('../route/beerlist-routes.js');

// initialize the routes
// TODO: make this not magical
beerListRoutes(router);
// should be more like
// router.addRoutes(beerListRoutes)
// or
// finishedRouter = beerListRoutes(newRouter)
// or something.

module.exports = http.createServer(router.route);
