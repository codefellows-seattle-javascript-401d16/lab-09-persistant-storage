
'use strict';

const router = require('../lib/router.js');

const Player = require('../model/player.js');

router.post('/api/player', (req, res) => {
  if(!req.body.name || !req.body.team || !req.body.position)
    return res.sendStatus(400);

  new Player(req.body.name, req.body.team, req.body.position)
    .save()
    .then(player => res.sendJSON(200, player))
    .catch(() => res.sendStatus(500));
});


router.get('/api/player', (req,res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Player.findById(req.url.query.id)
    .then(player => res.sendJSON(200, player))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});
