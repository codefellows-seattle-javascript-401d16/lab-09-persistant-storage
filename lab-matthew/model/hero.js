'use strict';

const storage = require('../lib/storage.js');

// module.exports = function Character(name, species, profession, power){
//   this.name = name;
//   this.species = species;
//   this.profession = profession;
//   this.power = power;
// };
//
// Character.prototype.save = () =>{
//
// };

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
    return new Hero(data.content, id);
  });
};

module.exports = Hero;
