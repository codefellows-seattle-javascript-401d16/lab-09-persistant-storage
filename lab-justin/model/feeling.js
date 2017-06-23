'use strict';

const storage = require('../lib/storage.js');

class Feeling {
  constructor(name, age, feelings, id){
    this.name = name;
    this.age = age;
    this.feelings = feelings;
    this.id = id;
  }

  save(){
    return storage.setItem(this);
  }

  update(){
    return storage.updateItem(this);
  }

  delete() {
    return storage.deleteItem(this.id);
  }
}

Feeling.findById = (id) => {
  return storage.fetchItem(id)
  .then(data => {
    return new Feeling(data.name, data.age, data.feelings, id);
  });
};

module.exports = Feeling;
