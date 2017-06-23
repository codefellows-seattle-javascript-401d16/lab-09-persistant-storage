'use strict';

const storage = require('../data/storage.js');

//start of my object constructor to manage all object requests
class ClimberProfile {
  constructor(age, type, id){
    this.age = age;
    this.type = type;
    this.id = id; //returns undefined on first creation.
  }

  save(){
    return storage.setItem(this);
  }

//udpate doesnt take in this.id because it does that inside the function
  update() {
    return storage.updateItem(this);
  }

  delete() {
    return storage.deleteItem(this.id);
  }
}

ClimberProfile.fetchById = (id) => {
  return storage.fetchItem(id)
  .then(data => {
    return new ClimberProfile(data.age, data.type, id);
  });
};

module.exports = ClimberProfile;
