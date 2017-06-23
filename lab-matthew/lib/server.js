'use strict';

// node modules
const http = require('http');
// npm modules
const uuid = require('uuid');
// app modules
const router = require('./router.js');


// require our routes
require('../route/hero-router.js');

// create our server
const server = module.exports = http.createServer(router.route);





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


// same as this:

// http.createServer((req,res) => {
//  router.route(req,res)
// })
