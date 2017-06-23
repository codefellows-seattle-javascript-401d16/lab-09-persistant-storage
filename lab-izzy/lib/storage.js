'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');

let storage = module.exports = {};

storage.setItem = (data) => {
  data.id = uuid.v1();
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => Promise.resolve(data));
};

storage.fetchItem = (id) => {
  let file = `${__dirname}/../data/${id}`;
  return fs.pathExists(file)
  .then(exists => {
    if(exists) {
      return fs.readJson(file)
      .then(data => Promise.resolve(data))
      .catch(() => Promise.reject(new Error('not found')));
    } else
    return Promise.reject(new Error('not found'));
  });
};


storage.updateItem = (data) => {
  let file = `${__dirname}/../data/${data.id}`;
  if(data.id){
    return fs.pathExists(file)
    .then(exists => {
      if(exists) {
        return fs.writeJson(file)
        .then(data => Promise.resolve(data))
        .catch(() => Promise.reject(new Error('the data must have an id')));
      } else {
        return Promise.reject(new Error('the data must have an id'));
      }
    });
  }
};

storage.deleteItem = (id) => {
  let file = `${__dirname}/../data/${id}`;
  return fs.pathExists(file)
    .then(exists => {
      if(exists) {
        return fs.remove(file)
        .then(() => Promise.resolve())
        .catch(() => Promise.reject(new Error('not found')));
      }
      return Promise.reject(new Error('not found'));
    });
};
