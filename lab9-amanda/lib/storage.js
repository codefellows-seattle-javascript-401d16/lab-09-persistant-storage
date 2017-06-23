'use strict'

let uuid = require('uuid');
let fs = require('fs');
let parse = require('json-parse-stream');
let fs = require('fs-extra');
let storage = module.exports = {}

const cache = {}

storage.setItem = (data) => {
  console.log('in setItem');
  data.id = uuid.v1()
  cache[data.id] = data
  // TODO:  now that it has an id save it to ../data/${id} as json
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data)
}

storage.fetchItem = (id) => {
  console.log('cache', cache)
  console.log('id', id)
  fs.readFile.id(`${__dirname}/../data/${data.id}`, data)
  let result = cache[id]
  if(result)
    return Promise.resolve(result)
  return Promise.reject(new Error('not found'))
})

storage.updateItem = (data) => {
  if(data.id){
    cache[data.id] = data
    return Promise.resolve(data)
  }
  return Promise.reject(new Error('data must have id'))
}

storage.deleteItem = (id) => {
  if (cache[id]){
    delete cache[id]
    return Promise.resolve()
  }
  return Promise.reject(new Error('not found'));
}
