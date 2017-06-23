'use strict';

const storage = require('../model/storage.js');

class Movie {
  constructor(title, year, genre) {
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.id = id;
  }

  save(){
    return storage.setItem(this);
  }

  update(){
    return storage.updateItem(this);
  }

  delete(){
    return storage.deleteItem(this.id);
  }
}

Movie.findById = (id) => {
  return storage.fetchItem(id)
  .then(data => {
    return new Movie(data.content, id);
  });
};

module.exports = Movie;
