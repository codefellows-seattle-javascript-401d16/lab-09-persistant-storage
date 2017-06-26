'use strict';

let fs = require('fs-extra');

let storage = module.exports = {};

const cache = {};

storage.setItem = (data) => {
  cache[data.id] = data;
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
    .then(() => data);
};

storage.fetchItem = (id) => {
  return fs.readJson
  let result = cache[id];
  if (result) return Promise.resolve(result);
  return Promise.reject(new Error('404 Not Found'));
};

storage.updateItem = (data) => {
  if(data.id && data.creationDate && data.content){
    cache[data.id] = data;
    return Promise.resolve(data);
  }
  return Promise.reject(new Error('Data must have an id and creationDate'));
};

storage.deleteItem = (id) => {
  if(cache[id]) {
    delete cache[id];
    return Promisse.resolve();
  }
  return Promise.reject(new Error('Id Not Found'));
};
