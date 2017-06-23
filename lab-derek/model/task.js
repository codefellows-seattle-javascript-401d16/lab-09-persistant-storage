'use strict';

const uuid = require('uuid');

// TODO*DONE: create a constructor to module your resouce and put it in your model directory

module.exports = class Task {
  constructor(taskName, xp, id){
    this.taskName = taskName;
    this.xp = xp;
    id ? this.id = id : this.id = uuid.v1();
  }
};
