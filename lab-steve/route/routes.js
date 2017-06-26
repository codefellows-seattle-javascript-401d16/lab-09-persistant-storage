const server = require('../lib/server.js');
const router = require('../lib/router.js');
const Beer = require('../model/beer.js');

router.post('/api/beers', (req, res) => {
  if(!req.body.name || !req.body.grain || !req.body.hops || !req.body.yeast) {
    res.writeHead(400, {
      'Content-Type' : 'text/plain',
    });
    res.write('Bad Request: You\'re missing some required arguments.  You need name, grain, hops, & yeast.');
    res.end();
    return;
  }
  //use ../model/beer.js constructor and create new Beer then store the beer object in the server.storage object above.
  let beer = new Beer(req.body.name, req.body.grain, req.body.hops, req.body.yeast);
  server.storage[beer.id] = beer;
  // console.log(beer);
  // console.log('Storage now contains: ', server.storage);

  res.writeHead(201, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(beer));
  res.end();
  return;
});

router.put('/api/beers', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type' : 'text/plain',
    });
    res.write('You need to include a query string with a valid ID (?id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)!');
    res.end();
    return;
  }

  if(!server.storage[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type' : 'text/plain',
    });
    res.write('Beer ID \'' + req.url.query.id + '\' not found!');
    res.end();
    return;
  }

  if(!req.body.name || !req.body.grain || !req.body.hops || !req.body.yeast) {
    res.writeHead(400, {
      'Content-Type' : 'text/plain',
    });
    res.write('Bad Request: You\'re missing some required arguments.  You need id, name, grain, hops, & yeast.');
    res.end();
    return;
  }

  server.storage[req.url.query.id] = {
    id: req.url.query.id,
    name: req.body.name,
    grain:  req.body.grain,
    hops: req.body.hops,
    yeast: req.body.yeast,
  };

  // console.log('Storage now contains: ', server.storage);
  res.writeHead(202, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(server.storage[req.url.query.id]));
  res.end();
  return;
});

router.delete('/api/beers', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type' : 'text/plain',
    });
    res.write('Bad Request: Query string with id must be included!');
    res.end();
    return;
  }
  if(!server.storage[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type' : 'text/plain',
    });
    res.write('Beer ID \'' + req.url.query.id + '\' not found!');
    res.end();
    return;
  }
  delete server.storage[req.url.query.id];
  // console.log('Storage now contains: ', server.storage);
  res.writeHead(204, {
    'Content-Type' : 'text/plain',
  });
  res.write('Beer with ID \'' + req.url.query.id + '\' removed!');
  res.end();
  return;
});

router.get('/api/beers', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(200, {
      'Content-Type' : 'application/json',
    });
    res.write(JSON.stringify(Object.keys(server.storage)));
    // res.write(JSON.stringify(Object.keys(server.storage).map(key => server.storage[key]))); //this would return an array of all beer objects
    res.end();
    return;
  }
  if(!server.storage[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type' : 'text/plain',
    });
    res.write('Beer ID \'' + req.url.query.id + '\' not found!');
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(server.storage[req.url.query.id]));
  res.end();
  return;
});
