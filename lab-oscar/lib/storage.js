'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');
let storage = module.exports = {};

storage.setItem = (data) => {
  data.id = uuid.v1();
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
};

storage.updateItem = (data) => {
  return fs.remove(`${__dirname}/../data/${data.id}`)
  .then(() => {
    fs.writeJson(`${__dirname}/../data/${data.id}`, data);
  })
  .then(()=>data);
};
storage.deleteItem = (data) => {
  console.log('this loging',data);
  return fs.remove(`${__dirname}/../data/${data}`)
  .then(() => data)
  .catch(err => {
    return Promise.reject(new Error('not found'));
  });
};
storage.fetchItem = (id) => {
  return fs.readJson(`${__dirname}/../data/${id}`)
  // console.log('result',result);
  .then(packageObj => {
    return Promise.resolve(packageObj);
  })
  .catch(err => {
    return Promise.reject(new Error('not found'));
  });
};
