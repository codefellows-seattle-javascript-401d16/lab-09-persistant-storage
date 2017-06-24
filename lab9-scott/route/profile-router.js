'use strict';
///the router talks to model and the model talks to the storage.
const router = require('../lib/router.js');
const ClimberProfile = require('../model/profile.js');

router.post('/api/climberprofile', (req, res) => {
  if(!req.body.age && !req.body.type){
    res.sendStatus(400);
  }
  new ClimberProfile(req.body.age, req.body.type)
    .save()
    .then(climberProfile => res.sendJSON(201, climberProfile))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/api/climberprofile', (req, res) => {
  if(!req.url.query.id) return res.sendStatus(400);
  console.log('prof route id: ', req.url.query.id);
  ClimberProfile.fetchByID(req.url.query.id)
    .then(climberprofile => res.sendJSON(200, climberprofile))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});
