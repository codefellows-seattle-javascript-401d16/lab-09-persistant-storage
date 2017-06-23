/* global __dirname */

const BeerList = require('../model/beerlist.js');
const Storage = require('../lib/storage.js');
const beerList = new BeerList(new Storage(`${__dirname}/../data/`));

module.exports = (router) => {
  router.post('/api/beers/', (req, res) => {
    if(!req.body) {
      res.sendStatus(400);
      return;
    }
    if(!(req.body.name && req.body.brewer && req.body.style)) {
      res.sendStatus(400);
      return;
    }
    beerList.create({
      name: req.body.name,
      style: req.body.style,
      brewer: req.body.brewer,
    })
    .then((newBeer) => {
      res.json(201, newBeer);
    })
    .catch(() => {
      res.sendStatus(500);
    });
  });

  router.get('/api/beers/', (req, res) => {
    if(!req.url.query.id) {
      beerList.getAllIds()
      .then((ids) => res.json(200, ids));
      return;
    }
    beerList.readById(req.url.query.id)
    .then((foundBeer) => res.json(200, foundBeer))
    .catch(() => {
      res.sendStatus(404);
    });
  });

  router.put('/api/beers/', (req, res) => {

    if(!req.url.query.id) {
      res.sendStatus(400);
      return;
    }

    const updateData = {};
    if(req.body.name) updateData.name = req.body.name;
    if(req.body.style) updateData.style = req.body.style;
    if(req.body.brewer) updateData.brewer = req.body.brewer;

    beerList.updateById(req.url.query.id, updateData)
    .then((updatedBeer) => {
      if(!updatedBeer) {
        res.sendStatus(400);
        return;
      }
      res.json(202, updatedBeer);
    })
    .catch(() => {
      res.sendStatus(500);
    });
  });

  router.delete('/api/beers/', (req, res) => {

    if(!req.url.query.id) {
      res.sendStatus(400);
      return;
    }

    beerList.deleteById(req.url.query.id)
    .then(success => {
      res.sendStatus(success? 204 : 404);
    });

  });
};
