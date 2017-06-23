'use strict';

// TODO*DONE: pull your routes into a seporate module

router.post('/api/tasks', (req, res) => {
  if(!req.body){
    res.write('bad request');
    res.writeHead(400);
    res.end();
    return;
  }
  let newTask = new Task (req.body.name, req.body.xp, req.body.id);
  storage[newTask.id] = newTask;
  IDs.push(newTask.id);
  res.writeHead(201, {
    'Content-type': 'application/json',
  });
  res.write(`successful POST request, created task ${newTask.id}\n`);
  res.write(JSON.stringify(newTask));
  res.end();
});

router.get('/api/tasks', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.write('bad request');
    res.write('\navailable IDs: ' + JSON.stringify(IDs));
    console.log(IDs);
    res.end();
    return;
  }
  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.write('not found');
    console.log(IDs);
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  res.write(`successful GET request to id ${req.url.query.id}\n`);
  res.write(`returning task: ${JSON.stringify(storage[req.url.query.id])}\n`);
  res.end();
  return;
});

router.put('/api/tasks', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.write('invalid query string');
    res.end();
    return;
  }
  if(!req.body){
    res.writeHead(400);
    res.write('bad request');
    res.end();
    return;
  }
  if(req.body.name){
    storage[req.url.query.id].taskName = req.body.name;
  }
  if(req.body.xp){
    storage[req.url.query.id].xp = req.body.xp;
  }
  res.writeHead(202, {
    'Content-type': 'application/json',
  });
  res.write('update successful\n');
  res.write(`returning task: ${JSON.stringify(storage[req.url.query.id])}\n`);
  res.end();
  return;
});

router.delete('/api/tasks', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.write('invalid id in querystring');
    res.end();
    return;
  }
  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.write('not found');
    res.end();
    return;
  }
  storage[req.url.query.id] = undefined;
  res.writeHead(204);
  res.end();
  return;
});
