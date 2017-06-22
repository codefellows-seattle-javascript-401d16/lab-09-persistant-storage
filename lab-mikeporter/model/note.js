'use strict';

const storage = require('../lib/storage.js');

module.exports = function Note (id, creationDate, content) {
  this.id = id;
  this.creationDate = creationDate;
  this.content = content;
};

class Note {
  constructor (id, creationDate, content) {
    this.id = id;
    this.creationDate = creationDate;
    this.content = content;
  }

  save () {
    return storage.setItem(this);
  }

  update () {
    return storage.updateItem(this);
  }

  delete () {
    return storage.deleteItem(this.id);
  }
}

Note.findById = (id) => {
  return storage.fetchItem(id)
    .then(data => {
      return new Note(data.content, id);
    });
};

module.exports = Note;
