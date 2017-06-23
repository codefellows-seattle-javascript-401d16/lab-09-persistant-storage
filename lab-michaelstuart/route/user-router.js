const User = require('../model/user');
const router = require('../lib/router.js');

router.post('/api/user', (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) return res.sendStatus(400);
  new User(name, password, email)
    .save()
    .then(user => res.sendJSON(201, user))
    .catch(() => res.sendStatus(500));
});

router.get('/api/user', (req, res) => {
  const id = req.url.query.id;
  if(!id) return res.sendStatus(400);
  User.findById(id)
    .then(user => res.sendJSON(200, user))
    .catch(() => res.sendStatus(404));
});

router.put('/api/user', (req, res) => {
  let { name, password, email } = req.body;
  const id = req.url.query.id || req.body.id;
  if (!id || (!name && !password && !email)) return res.sendStatus(400);
  User.findById(id)
    .then(user => {
      name = name || user.name;
      password = password || user.password;
      email = email || user.email;
      new User(name, password, email, id)
        .save()
        .then(user => res.sendJSON(202, user))
        .catch(() => res.sendStatus(500));
    })
    .catch(() => res.sendStatus(404));
});

router.delete('/api/user', (req, res) => {
  const id = req.url.query.id || req.body.id;
  if(!id) return res.sendStatus(400);
  User.delete(id)
    .then(() => res.sendJSON(204))
    .catch(() => res.sendStatus(404));
});

module.exports = router;
