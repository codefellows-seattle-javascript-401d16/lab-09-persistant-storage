'use strict';

const storage = require('../lib/storage.js');

class User {
  constructor(name, password, email, id) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.id = id;
  }

  save() {
    return storage.setItem(this);
  }

  static findById(id) {
    return storage.fetchItem(id)
      .then(data => data);
  }

  static delete(id) {
    return storage.deleteItem(id);
  }
}

module.exports = User;
