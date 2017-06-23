'use strict';

const storage = require('../lib/storage.js');

class Player {
  constructor(name, team, position, id) {
    this.name = name;
    this.team = team;
    this.position = position;
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

Player.findById = (id) => {
  return storage.fetchItem(id)
    .then(data => {
      return new Player(data.name, data.team. data.position, data.id);
    })
    .catch(err => Promise.reject(err));
};

module.exports = Player;
