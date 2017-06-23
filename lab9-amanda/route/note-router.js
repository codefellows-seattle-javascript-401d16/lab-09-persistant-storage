'use strict';

const router = require('../lib/router.js')

const Note = require('../model/note.js');

router.post('/api/notes', (req, res) => {
  if(!req.body.content)
    return res.sendStatus(400)

  new Note(req.body.content)
  .save()
  .then(note => res.sendJSON(200, note))
  .catch(err => res.sendStatus(500))
})


router.get('/api/notes', (req,res) => {
  if(!req.url.query.id)
    return res.sendStatus(400)

  Note.findById(req.url.query.id)
  .then(note => res.sendJSON(200, note))
  .catch(err => {
    console.error(err)
    res.sendStatus(404)
  })
})
