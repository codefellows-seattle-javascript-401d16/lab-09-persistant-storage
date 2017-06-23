'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');

let storage = module.exports = {};

const storedData = {};

storage.setItem = (data) => {
  console.log(data);
  data.id = uuid.v1();
  storedData[data.id] = data;

  // TODO: now that we have an id, we save it to ../data/${id} as JSON
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
};

storage.fetchItem = (id) => {
  // check if ../data/${id} exists
  // if it exists read it and parse the JSON
  console.log('storedData', storedData);
  console.log('id', id);

  let result = fs.readJson(`${__dirname}/../data/${id}`);
  if(result)
    return Promise.resolve(result);
  return Promise.reject(new Error('not found'));
};

storage.updateItem = (data) => {
  console.log('some stuff', data);
  if(data.id){

    fs.writeJson(`${__dirname}/../data/${data.id}`, data);

    return Promise.resolve(data);
  }
  return Promise.reject(new Error);
};

storage.deleteItem = (data) => {
  console.log(`${__dirname}/../data/${data.id}`);
  // fs.remove(`${__dirname}/../data/${data.id}`, err => {
  //   if(err) return console.error('YOU ARE A MORON')
  //
  //   console.log('success');
  // });

};

// test with a console log that the value/path it would have deleted

















// esodfghjelkshjgsldkj
