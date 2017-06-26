'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');
// let cache = {};

let storage = module.exports = {};

//the data passed in is going to be an object
//these are going to return promises
storage.setItem = (data) => {
  //creating the id in our storage because typically the db create them (ie mongo)
  data.id = uuid.v1();
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
    .then(() => data);
};

storage.fetchItem = (id) => {
  let pathExist = fs.pathExists(`${__dirname}/../data/${id}`);
  let result = fs.readJson(`${__dirname}/../data/${id}`);
  if (pathExist) return Promise.resolve(result);
  return Promise.reject(new Error('profile not found'));
};

storage.updateItem = (req) => {
  return fs.pathExists(`${__dirname}/../data/${req.url.query.id}`)
    .then(exists => {
      if(exists){
        let updatedBody = {
          age: req.body.age,
          type: req.body.type,
          id: req.url.query.id,
        };
        return fs.writeJson(`${__dirname}/../data/${req.url.query.id}`, updatedBody)
          .then(() => {
            return Promise.resolve(updatedBody);
          });
      }
      return Promise.reject(new Error('climber profile not in database'));
    });
};

storage.deleteItem = (id) => {
  return fs.pathExists(`${__dirname}/../data/${id}`)
    .then(exists =>
    {if(exists){
      let result = fs.remove(`${__dirname}/../data/${id}`);
      return Promise.resolve(result);
    }
    return Promise.reject(new Error('profile not found for deletion'));
    });
};
