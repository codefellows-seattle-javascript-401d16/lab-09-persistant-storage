'use strict';

const storage = require('../lib/storage.js')

class Note {
  constructor(content, id){
    this.content = content
    this.id = id;
  }

  save(){
    console.log('in save');
    return storage.setItem(this)
  }

  update(){
    return storage.updateItem(this)
  }

  delete(){
    return storage.deleteItem(this.id)
  }
}

Note.findById = (id) => {
  console.log(id, "id");
  return storage.fetchItem(id)
  .then(data => {
    return new Note(data.content, id)
  })
}

module.exports = Note
