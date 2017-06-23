'use strict';

const router = require('../lib/router.js');

const Hero = require('../model/hero.js');


router.post('/api/heroes', (req, res) => {
  if(!req.body.name || !req.body.species || !req.body.profession || !req.body.power)
    return res.sendStatus(400);
  let body = req.body;
  new Hero(body.name, body.species, body.profession, body.power)
  .save()
  .then(hero => res.sendJSON(200, hero))
  .catch(err => res.sendStatus(500));
});


router.get('/api/heroes', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Hero.findById(req.url.query.id)
  .then(hero => res.sendJSON(200, hero))
  .catch(err => {
    console.error(err);
    res.sendStatus(404);
  });
});


router.put('/api/heroes', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Hero.findById(req.url.query.id)
  .then(hero => {
    hero.name = req.body.name;
    hero.species = req.body.species;
    hero.profession = req.body.profession;
    hero.power = req.body.power;
    console.log(hero);
    return hero.update();
  })
  .then(hero => res.sendJSON(202, hero))
  .catch(err => res.sendStatus(404));
});


router.delete('/api/heroes', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Hero.findById(req.url.query.id)
  .then(hero => {
    return hero.delete();
  })
  .then(hero => res.sendJSON(204, hero))
  .catch(err => res.sendStatus(404));
});
