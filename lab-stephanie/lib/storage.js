'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');
// fs.write file to store info into data file.
let cache = {};

let storage = module.exports = {};

storage.setItem = (data) => {
  data.id = uuid.v1();
  cache[data.id] = data;
  //TODO: now that it has an id save it to the ../data/${id} as json.
  return fs.writeJson(`${__dirname}/../data/${data.id}`)
    .then(() => data);
};

storage.fetchItem = (id) => {
  let result = cache[id];
  //TODO: check if the ../data/${id} file exists and if so read it and parse the json.
  if(result)
    return Promise.resolve(result);
  return Promise.reject(new Error('not found'));
};

storage.updateItem = (data) => {
  if (data.id){
    cache[data.id] = data;
    return Promise.resolve(data);
  }
  return Promise.reject(new Error('data must have id'));
};

storage.deleteItem = (id) => {
  if(cache[id]) {
    delete cache[id];
    return Promise.resolve();
  }
  return Promise.reject(new Error('not found'));
};
