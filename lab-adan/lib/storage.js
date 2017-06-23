'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');

let storage = module.exports = {};

storage.setItem = data => {
  data.id = uuid.v1();
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
    .then(() => Promise.resolve(data));
};

storage.fetchItem = id => {
  let path = `${__dirname}/../data/${id}`;
  return fs.pathExists(path)
    .then(exists => {
      if(exists) {
        return fs.readJson(path)
          .then(data => Promise.resolve(data))
          .catch(() => Promise.reject(new Error('not found')));
      } else
        return Promise.reject(new Error('not found'));
    });
};

storage.updateItem = data => {
  let path = `${__dirname}/../data/${data.id}`;
  return fs.writeJson(path, data)
    .then(data => Promise.resolve(data))
    .catch(() => Promise.reject(new Error('not found')));
};

storage.deleteItem = id => {
  let path = `${__dirname}/../data/${id}`;
  return fs.pathExists(path)
    .then(exists => {
      if(exists) {
        return fs.remove(path)
          .then(() => Promise.resolve())
          .catch(() => Promise.reject(new Error('not found')));
      }
      return Promise.reject(new Error('not found'));
    });
};
