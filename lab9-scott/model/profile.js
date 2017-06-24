'use strict';

const storage = require('../lib/storage.js');

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

ClimberProfile.fetchByID = (id) => {
  return storage.fetchItem(id)
    .then(data => {
      console.log('fetched item: ',data);
      return data;
    });
};

module.exports = ClimberProfile;
