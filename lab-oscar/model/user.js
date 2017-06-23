'use strict';

const storage = require('../lib/storage.js');

class User {
  constructor(username, pwd, fname, lname,id){
    this.username =username;
    this.pwd = pwd;
    this.fname = fname;
    this.lname = lname;
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

User.findById = (id) => {
  return storage.fetchItem(id)
  .then(data =>{
    return new User(id, data.username, data.pwd, data.fname, data.lname);
  });
};
//this code will be use to get put working
//return new User(id, data.username, data.pwd, data.fname, data.lname);

module.exports = User;
