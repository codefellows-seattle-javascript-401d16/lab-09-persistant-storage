'use strict';
const storage = require('../lib/storage.js');

class OptIn {
  constructor(name, age, id) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  save(){
    return storage.setItem(this);
  }

  update(){
    return storage.updateItem(this);
  }

  delete(){
    return storage.deleteItem(this);
  }
}

OptIn.findById= (id) => {
  return storage.fetchItem(id)
  .then(data => {
    return new OptIn(data.name, data.age, id);
  });
};

module.exports = OptIn;
