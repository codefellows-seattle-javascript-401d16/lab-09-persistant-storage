'use strict';

const router = require('../lib/router.js');
const User = require('../model/user.js');

router.post('/api/user', (req, res) =>{
  if(!req.body.username)
    return res.sendStatus(400);
  // console.log('this id', data.id);
  new User(req.body.username, req.body.pwd, req.body.fname, req.body.lname)
  .save()
  .then(user => res.sendJSON(200, user))
  .catch(err => res.sendStatus(500))
});

router.get('/api/user', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);
  User.findById(req.url.query.id)
  .then(user => res.sendJSON(200, user))
  .catch(err => {
    res.sendStatus(404);
  });
});
