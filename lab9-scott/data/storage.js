'use strict';

let uuid = require('uuid');
let cache = {};

let storage = module.exports = {};

//the data passed in is going to be an object
//these are going to return promises
storage.setItem = (data) => {
  //creating the id in our storage because typically the db create them (ie mongo)
  data.id = uuid.v1();
  cache[data.id] = data;
  return Promise.resolve(data);
};

storage.fetchItem = (id) => {
  let result = cache[id];
  if (result) return Promise.resolve(result);
  return Promise.reject(new Error('profile not found'));
};

storage.updateItem = (data) => {
  if(data.id){
    cache[data.id] = data;
    return Promise.resolve(data);
  }
  return Promise.reject(new Error('profile not in database'));
};

storage.deleteItem = (id) => {
  // can't set cache[id] to a var because 'use strict' doesnt allow deletion of local variables.
  if (cache[id]) {
    delete cache[id];
    //still have to resolve because it was true but since we deleted it there's no data to really resolve.
    return Promise.resolve();
  }
  return Promise.rejecct(new Error('profile not found for delete'));
};
