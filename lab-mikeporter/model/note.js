'use strict';

const storage = require('../lib/storage.js');

class Note {
  constructor (id, creationDate, content) {
    this.id = id;
    this.creationDate = creationDate;
    this.content = content;
  }

  save () {
    console.log('saving', this);
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
    .then((data) => {
      return new Note(id, data.creationDate, data.content);
    });
};

module.exports = Note;
