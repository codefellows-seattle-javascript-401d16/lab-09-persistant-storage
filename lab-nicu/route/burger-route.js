'use strict';

const router = require('../lib/router.js');
const Burger = require('../model/burger.js');

router.post('/api/burgers', (req, res) => {
  if ((!req.body.name && !req.body.location && !req.body.stars) || req.body === {} || !req.body) {
    res.writeHead(400);
    return;
  }
  let burger = new Burger(req.body.name, req.body.location, req.body.stars);
  burger.save()
    .then(() => {
      return res.sendJSON(201, { Message: 'Burger Successfully Created', burger });
    })
    .catch((err) => {
      return res.sendStatus(400);
    });
});

router.get('/api/burgers', (req, res) => {
  if (!req.url.query.id) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify({ Message: 'Burger IDs Available', ids: Object.keys(storage) }));
    res.end();
    return;
  }
  return Burger.findById(req.url.query.id)
    .then((burger) => {
      return res.sendJSON(200, burger);
    })
    .catch( err => {
      return res.sendJSON(404,{ Message: `ID not found` });
    });
});

router.delete('/api/burgers', (req, res) => {

  return Burger.findById(req.url.query.id)
    .then(burger =>{
      console.log('in burger route');
      return burger.delete();
    })
    .then(burger =>{
      return res.sendJSON(204, data);
    })
    .catch(err => {
      return res.sendJSON(404,{ Message: `ID not found` });
    });
});

router.put('/api/burgers', (req, res) => {
  if (req.body === {} || !req.body) {
    res.sendStatus(400);
  }
  return Burger.findById(req.url.query.id)
    .then(burger => {
      return burger.update(req.body);
    })
    .then(data =>{
      return res.sendJSON(202,{ Message: `Successfully updated`, UpdatedValues: data });
    })
    .catch((err) =>{
      return res.sendSON(404,{Message: `ID not found`});
    });
});