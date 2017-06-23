'use strict';

const router = require('../lib/router.js');

const Insta = require('../model/insta.js');

router.post('/api/instas', (req, res) => {
  if(!req.body.content)
    return res.sendStatus(400);

  new Insta(req.body.content)
  .save()
  .then(insta => res.sendJSON(200, insta))
  .catch(err => res.sendStatus(500));
});

router.get('/api/instas', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Insta.findById(req.url.query.id)
    .then(insta => res.sendJSON(200, insta))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});
router.put('/api/instas', (req, res) => {
  if(!req.body.content && !req.url.query.id)
    return res.sendStatus(400);

  Insta.findById(req.url.query.id)
    .then(insta => {
      insta.content = req.body.content;
      return insta.update();
    })
    .then(insta => {
      console.log(insta, 'INSTAAAAAAAA');
      res.sendJSON(200, insta);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});

router.delete('/api/instas', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(404);

  Insta.findById(req.url.query.id)
    .then(insta => {
      insta.content = req.body.content;
      return insta.delete();
    });
});
