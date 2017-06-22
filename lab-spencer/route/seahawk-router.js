'use strict';

const router = require('../lib/router.js');
const Seahawk = require('../model/seahawk.js');

router.post('/api/seahawks', (req, res) => {
  let body = req.body;
  if(!body.name || !body.height || !body.weight || !body.position || !body.picture)
    return res.sendStatus(400);

  new Seahawk(body.name, body.height, body.weight, body.position, body.picture)
    .save()
    .then(player => res.sendJSON(201, player))
    .catch(() => res.sendStatus(500));
});

router.get('/api/seahawks', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);
    // return res.sendJSON(200, team.players); send all players back if no id

  Seahawk.findById(req.url.query.id)
    .then(seahawk => res.sendJSON(200, seahawk))
    .catch(() => res.sendStatus(404));
});

router.put('/api/seahawks', (req, res) => {
  let body = req.body;
  if(!body.id || !body.name || !body.height || !body.weight || !body.position || !body.picture)
    return res.sendStatus(400);

  new Seahawk(body.name, body.height, body.weight, body.position, body.picture, body.id)
  .update()
  .then(seahawk => res.sendJSON(202, seahawk))
  .catch(err => {
    if(err.message === 'data must have id')
      return res.sendStatus(400);
    res.sendStatus(500);
  });
});

router.delete('/api/seahawks', (req, res) => {
  let body = req.body;
  if(!req.url.query.id)
    res.sendStatus(400);
  new Seahawk(body.name, body.height, body.weight, body.position, body.picture, body.id)
  .delete()
  .then(() => res.sendStatus(204))
  .catch(() => res.sendStatus(500));
});
