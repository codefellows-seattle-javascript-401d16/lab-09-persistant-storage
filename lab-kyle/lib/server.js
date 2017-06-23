'use strict';

const http = require('http');

const router = require('./router.js');
const Waypoint = require('../model/Waypoint.js');

router.post('/api/waypoints', (req, res) => {

  if(!req.body.name && !req.body.lat && !req.body.long && !req.body.desc){
    res.write(400);
    res.end();
    return;
  }
  // TODO: verify the body has lat, long, desc
  new Waypoint(req.body.name, req.body.lat, req.body.long, req.body.desc)
  .save()
  .then(Waypoint => res.sendJSON(200, Waypoint))
  .catch(err => res.sendStatus(500));
});

router.get('/api/waypoints', (req, res) => {
  if(!req.url.query.id) return res.sendStatus(400);

  Waypoint.findById(req.url.query.id)
  .then(note => res.sendJSON(200, note))
  .catch(err => {
    console.error(err);
    res.sendStatus(404);
  });
});

router.put('/api/waypoints', (req, res) => {

  if(!storage[req.body.id]){
    res.writeHead(500);
    res.end();
    return ;
  }

  if(req.body.name) storage[req.body.id].name = req.body.name;
  if(req.body.lat) storage[req.body.id].latitude = req.body.lat;
  if(req.body.long) storage[req.body.id].longitude = req.body.long;
  if(req.body.desc) storage[req.body.id].description = req.body.desc;
  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.body.id]));
  res.end();
});

router.delete('/api/waypoints', (req, res) => {

  if(storage[req.url.query.id]){

    storage[req.url.query.id] = undefined;
    res.writeHead(204, {
      'Content-Type': 'text/data',
    });
    res.write(JSON.stringify(storage[req.url.query.id]));
    res.end();
  }

  res.writeHead(404);
  res.end();
  return ;
});

const server = module.exports = http.createServer(router.route);
