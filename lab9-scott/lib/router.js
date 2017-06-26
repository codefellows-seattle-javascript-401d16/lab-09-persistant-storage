'use strict';

const requestParse = require('./request-parse.js');
const responseHelpers = require('./response-helpers.js');

const routes = {
  GET: {},
  PUT: {},
  POST: {},
  DELETE: {},
};

const router = module.exports = {};

router.get = (pathname, callback) => {
  routes.GET[pathname] = callback;
};
router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};
router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};
router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

//this is the main logic on where to route based on the req url
router.route = (req, res) => {
  //bringing in the response helpers to modify the responses.
  responseHelpers(res);
  //bring in the parsed url from requestParse file
  requestParse(req, (err) => {
    //respond with error if parsing fail from requestParse file
    if (err) {
      res.writeHead(400);
      res.end();
      return;
    }
    //if there is a callback for the request then invoke it
    let routeHandler = routes[req.method][req.url.pathname];
    //if there is a method and pathname then run this block
    if (routeHandler) {
      routeHandler(req, res);
    } else {
      res.writeHead(404);
      res.end();
      return;
    }
  });
};
