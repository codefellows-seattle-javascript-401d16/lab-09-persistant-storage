'use strict';

const uuid = require('uuid/');

//start of my object constructor on POST requests
module.exports = function(age, type) {
  this.id = uuid.v1();
  this.age = age;
  this.type = type;
};
