'use strict';
const storage = require('../lib/storage.js');

class Waypoint {
  constructor(id, name, lat, long, desc) {
    this.id = id;
    this.name = name;
    this.latitude = lat;
    this.longitude = long;
    this.description = desc;
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

Waypoint.findById = (id) => {
  return storage.fetchItem(id)
  .then(data => {
    return new Waypoint(data.content, id);
  });
};

module.exports = Waypoint;
