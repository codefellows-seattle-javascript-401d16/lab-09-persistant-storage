'use strict';

const storage = require('../lib/storage.js');

class Hero {
  constructor(name, species, profession, power, id){
    this.name = name;
    this.species = species;
    this.profession = profession;
    this.power = power;
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

Hero.findById = (id) => {
  return storage.fetchItem(id)
  .then(data => {
    return new Hero(data.name, data.species, data.profession, data.power, id);
  });
};

module.exports = Hero;
