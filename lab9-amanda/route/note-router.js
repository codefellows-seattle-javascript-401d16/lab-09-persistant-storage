'use strict';

const http = require('http');
const uuid = require('uuid');
const server = require('../lib/server.js');
const router = require('../lib/router.js');
const Note = require('../model/note');

var storage = {};

//POST
router.post('/api/notes', (req, res) => {
  console.log(req.body);
  if(!req.body.content) return res.sendStatus(400)

  let id = uuid.v1()

  new Note(req.body.content, id)
  .save()
  .then(note => res.sendJSON(200, note))
  .catch(err => res.sendStatus(500))
})
  console.log('end post');

//GET
router.get('/api/notes', (req,res) => {
    console.log(req.body)
  if(!req.url.query.id)
    return res.sendStatus(400)

  Note.findById(req.url.query.id)
  .then(note => res.sendJSON(200, note))
  .catch(err => {
    console.error(err)
    res.sendStatus(404)

    // .then(note => res.sendJSON(200, note))
    // .catch(err => res.sendStatus(500))
  })
})
