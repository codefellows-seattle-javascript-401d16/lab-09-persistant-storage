'use strict';

const router = require('../lib/router.js');
const GameScore = require('../model/gamescore.js');

router.post('/api/gamescore', (req, res) => {
  let body = req.body;
  if (!body.name || !body.score)
    return res.sendStatus(400);
  new GameScore(body.name, body.score)
    .save()
    .then((gamescore) => res.sendJSON(201, gamescore))
    .catch(() => res.sendStatus(500));
});
router.get('/api/gamescore', (req, res) => {
  if (!req.url.query.id) {
    return res.sendStatus(400);
  }

  GameScore.findById(req.url.query.id)
    .then(gamescore => res.sendJSON(200, gamescore))
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});
router.put('/api/gamescore', (req, res) => {
  let body = req.body;
  if(!body.name || !body.score)
    return res.sendStatus(400);

  return GameScore.findById(req.url.query.id)
    .then(gamescore => {
      gamescore = new GameScore(body.name, body.score);
      return gamescore.update()
        .then(() => res.sendJSON(202, gamescore))
        .catch(() => res.sendStatus(500));
    })
      .catch(err => {
        if(err.message === 'not found')
          res.sendStatus(404);
      });
});
router.delete('/api/gamescore', (req, res) => {
  if (!req.url.query.id)
    return res.sendStatus(400);
  return GameScore.findById(req.url.query.id)
    .then(gamescore =>{
      return gamescore.delete()
        .then(() => res.sendStatus(204))
        .catch(() => res.sendStatus(500));
    })
    .catch(err => {
      if(err.message === 'not found')
        res.sendStatus(404);
    });
});
