'use strict';

const http = require('http');
const router = require('./router.js');
const ProfileConstructor = require('../model/profile-constructor.js');

let climberPool = {};

//start of the route for Create/Post. Start with create so we have something in the db to work with.
router.post('/api/climberprofile', (req, res)=>{
  if(!req.body.age && !req.body.type) {
    return res.sendStatus(400);
  }
  //creating a new profile based on the parsed body from the post request
  let climberProfile = new ProfileConstructor(req.body.age, req.body.type);
  //putting the new profile id value as the key in the climberPool and set the new Profile as the value to that key id #
  climberPool[climberProfile.id] = climberProfile;
  //respond that we recieved the request
  return res.sendJSON(200, climberProfile);
});

//creating route for Read/Get
router.get('/api/climberprofile', (req, res) =>{
  if (!climberPool[req.url.query.id]) {
    return res.sendStatus(404);
  }
  if (!req.url.query.id) {
    return res.sendStatus(400);
  }
  res.sendJSON(200, climberPool[req.url.query.id]);
});

//creating route for DELETE
router.delete('/api/climberprofile', (req, res) =>{
  if (!climberPool[req.url.query.id]) {
    return res.sendStatus(404);
  }
  //delete the profile with matching the id
  delete climberPool[req.url.query.id];
  return res.sendText(204, `You deleted profile ${req.url.query.id}`);
});

//creating route for Put
router.put(`/api/climberprofile`, (req, res) =>{
  if (!climberPool[req.url.query.id]) {
    return res.sendStatus(404);
  }
  if (!req.url.query.id) {
    return res.sendStatus(400);
  }
  //data is passed in the body request as stringified json. Set the new req body to the profile at that id.
  // climberPool[req.url.query.id] = req.body;
  return res.sendJSON(200, climberPool[req.url.query.id]);
});

const server = module.exports = http.createServer(router.route);
