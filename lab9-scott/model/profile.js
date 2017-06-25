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


}

ClimberProfile.delete = (id) => {
  return storage.deleteItem(id);
};
//udpate doesnt take in this.id because it does that inside the function
ClimberProfile.update = (req) => {
  console.log('did i make it to profile update?');
  return storage.updateItem(req);
};

ClimberProfile.fetchByID = (id) => {
  return storage.fetchItem(id)
    .then(data => {
      console.log('fetched item: ',data);
      return new ClimberProfile(data.age, data.type, id);
    });
};

module.exports = ClimberProfile;
