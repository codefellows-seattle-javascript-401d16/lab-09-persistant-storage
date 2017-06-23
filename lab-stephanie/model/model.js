'use strict';

const uuid = require('uuid');
const storage = require('../lib/storage.js');


class FBPost {
  constructor (userName, content, id){
    this.userName = userName;
    this.id = id;
    this.content = content;
  }
  save(){
    return storage.setItem(this);
  }

  update() {
    return storage.updateItem(this);
  }

  delete() {
    return storage.deleteItem(this.id);
  }
}

FBPost.fetchById = (id) => {
  return storage.fetchItem(id)
    .then(data => {
      return new FBPost(data.content, id);
    });
};
let friendPost = new FBPost();
friendPost.save();

module.exports = FBPost;
