'use strict';

const router = require('../lib/router.js');

const FBPost = require('../model/model.js');
router.post('/apu/notes', (req, res) => {
  if(!req.body.conent)
    return res.sendStatus(400);

  new FBPost(req.body.content)
    .save()
    .then(post => res.sendJSON(200, post))
    .catch(err => res.sendStatus(500, err));
});

router.get('/api/posts', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  FBPost.fetchById(req.url.query.id)
    .then(post => res.sendJSON(200, post))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});
