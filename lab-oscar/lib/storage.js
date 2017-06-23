'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');
let storage = module.exports = {};

storage.setItem = (data) => {
  data.id = uuid.v1();
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
};

storage.fetchItem = (id) => {
  return fs.readJson(`${__dirname}/../data/${id}`)
  // console.log('result',result);
  .then(packageObj => {
    console.log(packageObj);
    return Promise.resolve(packageObj);
  })
  .catch(err => {
    return Promise.reject(new Error('not found'));
  })
  // if(result)
  //
  //   return Promise.resolve(result);
  // return Promise.reject(new Error('not found'));
};

// fs.readJson('./package.json')
// .then(packageObj => {
//   console.log(packageObj.version) // => 0.1.3
// })
// .catch(err => {
//   console.error(err)
// })
//
// storage.updateItem = (data) => {
//   if(data.id){
//     cache[data.id] = data
//     return Promise.resolve(data)
//   }
//   return Promise.reject(new Error('data must have id'))
// }
//
// storage.deleteItem = (id) => {
//   if (cache[id]){
//     delete cache[id]
//     return Promise.resolve()
//   }
//   return Promise.reject(new Error('not found'));
// }
