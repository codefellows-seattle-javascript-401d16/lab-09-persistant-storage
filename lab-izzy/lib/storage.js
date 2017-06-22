'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');

let storage = module.exports = {};

const storedData = {};

storage.setItem = (data) => {
  console.log(data);
  // data.id = id;
  storedData[data.id] = data;

  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
};

// storage.fetchItem = (id) => {
//   let result = `${__dirname}/../data/${data.id}`
//   if(result)
//
//   fs.readJson(`${__dirname}/../data/${data.id}`)
//
//
// }
