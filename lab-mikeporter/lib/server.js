'use strict';

const http = require('http');
const router = require('./router.js');
require('../route/noteRouter.js');

var storage = {};

router.put('/api/notes', (req, res) => {
  if (!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }

  if (!storage[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }

  if (!req.body.content) {
    res.write(400);
    res.end();
    return;
  }

  if (!req.body.creationDate) {
    res.write(400);
    res.end();
    return;
  }

  let creationDate = req.body.creationDate;
  let content = req.body.content;
  storage[req.url.query.id]['creationDate'] = creationDate;
  storage[req.url.query.id]['content'] = content;
  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
  return;
});

const server = module.exports = http.createServer(router.path);
