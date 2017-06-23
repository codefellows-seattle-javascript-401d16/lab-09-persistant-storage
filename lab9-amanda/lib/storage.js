'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');
let storage = module.exports = {};

const cache = {};

storage.setItem = (data) => {
  data.id = uuid.v1();
  cache[data.id] = data;
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
};

storage.fetchItem = (id) => {
  return fs.readJSON(`${__dirname}/../data/${id}`)
  .then((result) => Promise.resolve(result))
  .catch((err) => Promise.reject(new Error('not found', err)));
};

storage.updateItem = (data) => {
  if(data.id){
    cache[data.id] = data;
    return Promise.resolve(data);
  }
  return Promise.reject(new Error('data must have id'));
};

storage.deleteItem = (id) => {
  if (cache[id]){
    delete cache[id];
    return Promise.resolve();
  }
  return Promise.reject(new Error('not found'));
};
