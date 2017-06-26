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


router.post= (pathname, callback) => {
  routes.POST[pathname] = callback;
};

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};
router.route = (req, res) => {
  responseHelpers(res);
  requestParse(req, (err) => {
    if(err) return res.sendStatus(400);
    let routeHandler = routes[req.method][req.url.pathname];
    if(routeHandler)
      routeHandler(req, res);
    else
      return res.sendStatus(404);
  });
};
