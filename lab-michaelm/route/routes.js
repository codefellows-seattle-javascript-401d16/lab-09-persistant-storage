'use strict';

const router = require('../route/router.js');
const OptIn = require('../model/opt-in.js');
const responseHelpers = require('../lib/responseHelpers.js');

router.post('/api/opt', (req, res) => {
  responseHelpers(res);
  if(!req.body.name || !req.body.age){
    return res.sendStatus(400);
  }
  new OptIn(req.body.name, req.body.age)
  .save()
  .then(user => res.sendJSON(200, user))
  .catch(err => {
    res.sendStatus(500);
    console.log(err);
  });
});

router.put('/api/opt', (req, res) => {
  responseHelpers(res);
  if(!req.body.id){
    return res.sendText(400, 'No id provided, how am I supposed to know what data to get?');
  }
  OptIn.findById(req.body.id)
  .then(user => {
    user.name = req.body.name;
    user.age = req.body.age;
    user.id = req.body.id;
    console.log(user);
    return user.update();
  })
  .then(user => res.sendJSON(202, user))
  .catch((err) => {
    res.sendStatus(404);
    console.log(err);
  });
});

router.get('/api/opt', (req, res) => {
  responseHelpers(res);
  if(!req.url.query.id)
    return res.sendStatus(400);
  OptIn.findById(req.url.query.id)
  .then(user => res.sendJSON(200, user))
  .catch(err => {
    console.error(err);
    res.sendText(404, 'Could not find user.');
  });
});

router.delete('/api/opt', (req, res) => {
  responseHelpers(res);
  if(!req.url.query.id)
    return res.sendStatus(400);
  return OptIn.findById(req.url.query.id)
  .then(user => {
    return user.delete();
  })
  .then(res.sendStatus(204))
  .catch(err => {
    res.sendStatus(404);
    console.log(err);
  });
});
