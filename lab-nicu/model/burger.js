'use strict';

const storage = require('../lib/storage.js');

class Burger {
  constructor(name, location, stars, id) {
    this.name = name;
    this.location = location;
    this.stars = stars;
    this.id = id;
  }
  save() {
    return storage.setItem(this);
  }

  update(data) {
    return storage.updateItem(this, data)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
  delete() {
    return storage.deleteItem(this)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}


Burger.findById = (id) => {
  return storage.fetchItem(id)
    .then(data => {
      return Promise.resolve(new Burger(data.name, data.location, data.stars, data.id));
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

Burger.getAllIds = () => {
  return storage.fetchAllIds()
    .then(data => {
      return Promise.resolve(data);
    })
    .catch( err => {
      return Promise.reject(err);
    })
};



module.exports = Burger;