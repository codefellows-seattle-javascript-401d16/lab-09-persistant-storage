'use strict';

const router = require('../lib/router.js');

const Hero = require('../model/hero.js');

router.post('/api/heroes', (req, res) => {
  if(!req.body.name)
    return res.sendStatus(400);

  new Hero(req.body.name, req.body.species, req.body.profession, req.body.power)
  .save()
  .then(hero => res.sendJSON(200, hero))
  .catch(err => {res.sendStatus(500);
  });
});

router.get('/api/heroes', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Hero.findById(req.url.query.id)
  .then(hero => res.sendJSON(hero))
  .catch(err => {
    console.error(err);
    res.sendStatus(404);
  });
});
