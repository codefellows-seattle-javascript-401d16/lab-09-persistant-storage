'use strict';

const storage = require('../lib/storage.js');

class Seahawk {
  constructor(name, height, weight, position, picture, id) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.position = position;
    this.picture = picture;
    this.id = id;
  }

  save() {
    return storage.setItem(this);
  }

  update() {
    // ERROR BEGINS HERE
    return storage.updateItem(this);
  }

  delete() {
    return storage.deleteItem(this.id);
  }
}

Seahawk.findById = id => {
  return storage.fetchItem(id)
    .then(data => {
      return new Seahawk(data.name, data.height, data.weight, data.position, data.picture, data.id);
    })
    .catch(err => Promise.reject(err));
};

module.exports = Seahawk;
