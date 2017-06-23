'use strict';

const uuid = require('uuid');
const storage = require('../lib/storage.js');

class Player {
  constructor(name, team, position) {
    this.name = name;
    this.team = team;
    this.position = position;
    this.id = uuid.v1();
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
      return new Player(data.name, data.team. data.postion, id);
    });
};

module.exports = Player;
