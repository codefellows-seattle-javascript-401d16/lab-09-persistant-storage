'use strict';

const requestParse = require('../lib/request-parse.js');
const responseHelpers = require('../lib/responseHelpers.js');

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

router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};

router.route = (req, res) => {
  requestParse(req, (err) => {
    responseHelpers(res);
    if (req.url.pathname === '/api/opt') {

      if (err) {
        res.writeHead(400);
        res.end();
        return;
      }

      let routeHandler = routes[req.method][req.url.pathname];
      if (routeHandler) {
        routeHandler(req, res);
      } else {
        res.sendText(404, 'There are no routes for this method and pathname.');
        res.end();
      }
    } else {
      return res.sendText(404, 'Must use pathname: /api/opt');
    }
  });
};