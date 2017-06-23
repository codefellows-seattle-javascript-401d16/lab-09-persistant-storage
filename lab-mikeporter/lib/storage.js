'use strict';

let fs = require('fs-extra');

let storage = module.exports = {};

const cache = {};

storage.setItem = (data) => {
  cache[data.id] = data.id;
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
    .then(() => data);
};

storage.fetchItem = (id) => {
  let result = cache[id];
  if (result) return Promise.resolve(result);
  return Promise.reject(new Error('404 Not Found'));
};

storage.updateItem = (data) => {
  if(data.id && data.creationDate){
    cache[data.id] = data;
    cache[data.creationDate] = creationDate;
  }

};

storage.deleteItem = (data) => {

};
