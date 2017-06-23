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
  // let body = req.body;
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
  // new Hero(body.name, body.species, body.profession, body.power, req.url.query.id)
  .then(hero => res.sendJSON(202, hero))
  .catch(err => res.sendStatus(404));
});

//return hero.delete();


router.delete('/api/heroes', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Hero.findById(req.url.query.id)
  .then(hero => {
    return hero.delete();
  })
  .then(hero => res.sendJSON(200, hero))
  .catch(err => res.sendStatus(404));
});

//   if(!storage[req.url.query.id]){
//     res.writeHead(404, {
//       'Content-Type' : 'application/json',
//     });
//     res.end();
//     return;
//   }
//   delete storage[req.url.query.id];
//   res.writeHead(204, {
//     'Content-Type' : 'application/json',
//   });
//   res.write(JSON.stringify(storage[req.url.query.id]));
//   res.end();
// });



// router.put('/api/characters', (req, res) => {
//   let body = req.body;
//   if(!body || !body.name || !body.species || !body.profession || !body.power){
//     res.writeHead(400, {
//       'Content-Type' : 'application/json',
//     });
//     res.end();
//     return;
//   }
//   res.writeHead(202, {
//     'Content-Type' : 'application/json',
//   });
//   storage[req.url.query.id].name = req.body.name;
//   storage[req.url.query.id].species = req.body.species;
//   storage[req.url.query.id].profession = req.body.profession;
//   storage[req.url.query.id].power = req.body.power;
//   res.write(JSON.stringify(storage[req.url.query.id]));
//   res.end();
// });


// HERE WE GO

// router.post('/api/characters', (req, res) => {
//   let body = req.body;
//   if(!body || !body.name || !body.species || !body.profession || !body.power){
//     res.write(400, {
//       'Content-Type' : 'application/json',
//     });
//     res.end();
//     return;
//   }
//   let hero = new Character(req.body.name, req.body.species, req.body.profession, req.body.power);
//   hero.id = uuid.v1();
//
//   storage[hero.id] = hero;
//   res.writeHead(201, {
//     'Content-Type' : 'application/json',
//   });
//   res.write(JSON.stringify(hero));
//   res.end();
//   return;
// });
//
// router.get('/api/characters', (req, res) => {
//   if(!req.url.query.id){
//     res.writeHead(400, {
//       'Content-Type' : 'application/json',
//     });
//     res.end();
//     return;
//   }
//   if(!storage[req.url.query.id]){
//     res.writeHead(404, {
//       'Content-Type' : 'application/json',
//     });
//     res.end();
//     return;
//   }
//   if(req.url.query.id){
//     res.writeHead(200, {
//       'Content-Type' : 'application/json',
//     });
//     res.write(JSON.stringify(storage[req.url.query.id]));
//     res.end();
//   }
// });
//
// router.put('/api/characters', (req, res) => {
//   let body = req.body;
//   if(!body || !body.name || !body.species || !body.profession || !body.power){
//     res.writeHead(400, {
//       'Content-Type' : 'application/json',
//     });
//     res.end();
//     return;
//   }
//   res.writeHead(202, {
//     'Content-Type' : 'application/json',
//   });
//   storage[req.url.query.id].name = req.body.name;
//   storage[req.url.query.id].species = req.body.species;
//   storage[req.url.query.id].profession = req.body.profession;
//   storage[req.url.query.id].power = req.body.power;
//   res.write(JSON.stringify(storage[req.url.query.id]));
//   res.end();
// });
//
// router.delete('/api/characters', (req, res) => {
//   if(!storage[req.url.query.id]){
//     res.writeHead(404, {
//       'Content-Type' : 'application/json',
//     });
//     res.end();
//     return;
//   }
//   delete storage[req.url.query.id];
//   res.writeHead(204, {
//     'Content-Type' : 'application/json',
//   });
//   res.write(JSON.stringify(storage[req.url.query.id]));
//   res.end();
// });
