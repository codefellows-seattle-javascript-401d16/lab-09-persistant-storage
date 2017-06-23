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

router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};
router.get = (pathname, callback) => {
  routes.GET[pathname] = callback;
};
router.update = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};
router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};
router.route = (req, res) => {
  responseHelpers(res);

  requestParse(req, (err) => {

    if(err){
      res.writeHead(400);
      res.end();
      return;
    }

    let routeHandler = routes[req.method][req.url.pathname];
    if(routeHandler){
      routeHandler(req, res);
    } else {
      res.sendStatus(404);
    }
  });
};
