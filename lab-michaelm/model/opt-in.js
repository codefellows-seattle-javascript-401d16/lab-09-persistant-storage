'use strict';
const storage = require('../lib/storage.js');

class OptIn {
  constructor(id, name, age) {
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

OptIn.fetchId = (id) => {
  return storage.fetchItem(id);
};

module.exports = OptIn;
