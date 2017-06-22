'use strict';

let uuid = require('uuid');
let cache = {};

let storage = module.exports = {};

storage.setItem = (data) => {
  data.id = uuid.v1();
  cache[data.id] = data;
  return Promise.resolve(data);
};

storage.fetchItem = (id) => {
  let result = cache[id];
  if(result)
    return Promise.resolve(result);
  return Promise.reject(new Error('not found'));
};

storage.updateItem = (data) => {
  if(data.id){
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
