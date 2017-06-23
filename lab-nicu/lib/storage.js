'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');

let storage = module.exports = {};

storage.setItem = (data) => {
  data.id = uuid.v1();

  return fs.writeJSON(`${process.cwd()}/data/${data.id}`, data)
    .then(() => data)
    .catch((err) => console.log(err));
};

storage.fetchItem = (id) => {
  return fs.readJson(`${process.cwd()}/data/${id}`)
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      return Promise.reject(new Error('not found'));
    });
};

storage.updateItem = (data, updateData) => {
  updateData.id = data.id;
  return fs.writeJSON(`${process.cwd()}/data/${data.id}`, updateData)
    .then(() => {
      return Promise.resolve(updateData);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

storage.deleteItem = (data) => {
  console.log('in deleteItem')
  return fs.remove(`${process.cwd()}/data/${data.id}`)
    .then(() => {
      return Promise.resolve(data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};