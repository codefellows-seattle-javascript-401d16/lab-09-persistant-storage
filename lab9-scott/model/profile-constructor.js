'use strict';

const uuid = require('uuid/');

//start of my object constructor on POST requests

class ClimberProfile {
  constructor(age, type){
    this.id = uuid.v1();
    this.age = age;
    this.type = type;
  }
  save(){
    
  }
}

module.exports = ClimberProfile;
