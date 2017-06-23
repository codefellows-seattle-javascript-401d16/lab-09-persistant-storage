'use strict';

const uuid = require('uuid');
const fs = require('fs-extra');
const storage = module.exports = {};

storage.setItem = (data) => {
  data.id = data.id || uuid.v1();
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
    .then(() => data);
};

storage.fetchItem = (id) => {
  return fs.readJson(`${__dirname}/../data/${id}`)
    .then(data => {
      if(data) return Promise.resolve(data);
      return Promise.reject(new Error('not found'));
    });
};

storage.deleteItem = (id) => {
  const path = `${__dirname}/../data/${id}`;
  return fs.pathExists(path)
    .then(exists => {
      if (exists) {
        return fs.remove(path)
          .then(() => Promise.resolve());
      }
      return Promise.reject(new Error('not found'));
    });
};
