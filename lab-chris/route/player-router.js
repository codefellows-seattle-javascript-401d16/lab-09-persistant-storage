
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

router.put('/api/player', (req, res) => {
  if(!req.body.name || !req.body.height || !req.body.weight || !req.body.position || !req.body.picture)
    return res.sendStatus(400);

  return Player.findById(req.url.query.id)
    .then(player => {
      player = new Player(req.body.name, req.body.team, req.body.position, req.url.query.id);
      return player.update()
        .then(() => res.sendJSON(202, player));
      // .catch(() => res.sendStatus(500));
    })
    .catch(err => {
      if(err.message === 'not found')
        res.sendStatus(404);
    });
});

router.delete('/api/player', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);
  return Player.findById(req.url.query.id)
    .then(player => {
      return player.delete()
        .then(() => res.sendStatus(204));
      // .catch(() => res.sendStatus(500));
    })
    .catch(err => {
      if(err.message === 'not found')
        res.sendStatus(404);
    });
});
