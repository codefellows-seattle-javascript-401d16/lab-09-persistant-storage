'use strict';

const router = require('../route/router.js');
const OptIn = require('../model/opt-in.js');
const responseHelpers = require('../lib/responseHelpers.js');

router.post('/api/opt', (req, res) => {
  responseHelpers(res);
  if (!req.body.name || !req.body.age) {
    return res.sendStatus(400);
  }
  new OptIn(req.body.name, req.body.age)
    .save()
    .then(user => res.sendJSON(201, user))
    .catch(() => {
      res.sendStatus(500);
    });
});

router.put('/api/opt', (req, res) => {
  responseHelpers(res);
  if (!req.body.id) {
    return res.sendText(400, 'No id provided, how am I supposed to know what data to get?');
  }
  OptIn.findById(req.body.id)
    .then(user => {
      user.name = req.body.name;
      user.age = req.body.age;
      user.id = req.body.id;
      return user.update();
    })
    .then(user => res.sendJSON(202, user))
    .catch(() => {
      res.sendStatus(404);
    });
});

router.get('/api/opt', (req, res) => {
  responseHelpers(res);
  if (!req.url.query.id)
    return res.sendStatus(400);
  return OptIn.findById(req.url.query.id)
    .then(user => res.sendJSON(200, user))
    .catch(() => {
      res.sendStatus(404);
    });
});

router.delete('/api/opt', (req, res) => {
  responseHelpers(res);
  if (!req.url.query.id)
    return res.sendStatus(400);
  return OptIn.findById(req.url.query.id)
    .then((user) => {
      user.delete();
      res.sendStatus(202);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});