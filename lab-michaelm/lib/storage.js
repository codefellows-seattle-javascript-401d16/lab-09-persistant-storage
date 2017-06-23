'use strict';

const uuid = require('uuid');
const fs = require('fs-extra');
const storage = module.exports = {};

storage.setItem = (data) => {
  data.id = uuid.v1();
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
};

storage.fetchItem = (id) => {
  let result = fs.readJson(`${__dirname}/../data/${id}`);
  if(result)
    return Promise.resolve(result);
  return Promise.reject(new Error('not found'));
};

storage.updateItem = (data) => {
  if(data.id){
    fs.writeJson(`${__dirname}/../data/${data.id}`, data);
    return Promise.resolve(data);
  }
  return Promise.reject(new Error('data must have id'));
};

storage.deleteItem = (data) => {
  if (data){
    fs.remove(`${__dirname}/../data/${data.id}`)
    .catch((err) => {
      console.error(err);
    });
    return Promise.resolve();
  }
  return Promise.reject(new Error('not found'));
};
