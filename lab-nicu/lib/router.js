'use strict';

const requestParser = require('./request-parser');
const responseHelper = require('./response-helper.js');
const routes = {
  GET: {},
  PUT: {},
  POST:{},
  DELETE:{},
};

const router = module.exports = {};

router.get = (pathname, callback) =>{
  routes.GET[pathname] = callback;
};

router.put = (pathname, callback) =>{
  routes.PUT[pathname] = callback;
};

router.delete = (pathname, callback) =>{
  routes.DELETE[pathname] = callback;
};

router.post = (pathname, callback) =>{
  routes.POST[pathname] = callback;
};

router.route= (req, res) => {

  responseHelper(res);
  requestParser(req,(err) =>{
    
    if(err) res.sendStatus(400);
    let routeHandler = routes[req.method][req.url.pathname];
    if(routeHandler)
      routeHandler(req,res);
    else{
      res.sendStatus(404);
    }

  });
};