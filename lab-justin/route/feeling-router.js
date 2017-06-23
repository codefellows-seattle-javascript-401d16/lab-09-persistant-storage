'use strict';

const router = require('../lib/router.js');

const Feeling = require('../model/feeling.js');


router.post('/api/feelings', (req, res) => {
  if(!req.body.name || !req.body.age || !req.body.feelings)
    return res.sendStatus(400);
  let body = req.body;
  new Feeling(body.name, body.age, body.feelings)
  .save()
  .then(feeling => res.sendJSON(201, feeling))
  .catch(() => res.sendStatus(500));
});


router.get('/api/feelings', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Feeling.findById(req.url.query.id)
  .then(feeling => res.sendJSON(200, feeling))
  .catch(() => {
    res.sendStatus(404);
  });
});


router.put('/api/feelings', (req, res) => {
  if(!req.body.name || !req.body.age || !req.body.feelings || !req.url.query.id)
    return res.sendStatus(400);

  Feeling.findById(req.url.query.id)
  .then(feeling => {
    feeling.name = req.body.name;
    feeling.age = req.body.age;
    feeling.feelings = req.body.feelings;
    return feeling.update();
  })
  .then(feeling => res.sendJSON(202, feeling))
  .catch(() => res.sendStatus(404));
});


router.delete('/api/feelings', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Feeling.findById(req.url.query.id)
  .then(feeling => {
    return feeling.delete();
  })
  .then(feeling => res.sendJSON(204, feeling))
  .catch(() => res.sendStatus(404));
});
