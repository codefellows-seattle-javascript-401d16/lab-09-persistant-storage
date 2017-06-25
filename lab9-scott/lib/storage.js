'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');
// let cache = {};

let storage = module.exports = {};

//the data passed in is going to be an object
//these are going to return promises
storage.setItem = (data) => {
  //creating the id in our storage because typically the db create them (ie mongo)
  data.id = uuid.v1();
  // cache[data.id] = data;
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
    .then(() => data);
};

storage.fetchItem = (id) => {
  let pathExist = fs.pathExists(`${__dirname}/../data/${id}`);
  let result = fs.readJson(`${__dirname}/../data/${id}`);
  if (pathExist) return Promise.resolve(result);
  return Promise.reject(new Error('profile not found'));
};

storage.updateItem = (req) => {
  let pathExist = fs.pathExists(`${__dirname}/../data/${req.url.query.id}`);
  if(pathExist){
    // console.log('req query id: ', req.url.query.id);
    // console.log('req body age: ', req.body);
    let updatedBody = req.body;
    let result = fs.outputFile(`${__dirname}/../data/${req.url.query.id}`, updatedBody);
    return Promise.resolve(result);
  }
  return Promise.reject(new Error('climber profile not in database'));
};

storage.deleteItem = (id) => {
  console.log('id : ', id);
  let pathExist = fs.pathExists(`${__dirname}/../data/${id}`);
  if(pathExist){
    console.log(`${__dirname}/../data/${id}`);
    let result = fs.remove(`${__dirname}/../data/${id}`);
    return Promise.resolve(result);
  // can't set cache[id] to a var because 'use strict' doesnt allow deletion of local variables.
  }
  console.log('did i make it to here????');
  return Promise.reject(new Error('profile not found for deletion'));
};
