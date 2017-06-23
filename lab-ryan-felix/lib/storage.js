const uuid = require('uuid');
const fse = require('fs-extra');

module.exports = function(path) {

  fse.ensureDir(path)
  .catch(err => {
    console.log('Problem when ensuring storage directory:\n', err);
    // if we can't create the directory then we can't continue execution
    // so throw the error back on up
    throw err;
  });

  this.path = path;

  this.write = (object) => {
    const id = uuid.v1();
    object.id = id;
    return fse.writeJson(`${this.path}${id}.json`, object)
    .then(() => object);
  };

  this.readById = (id) => {
    return fse.readJson(`${this.path}${id}.json`)
    .then((obj) => obj);
  };

  this.updateById = (id, update) => {
    if(update.id) delete update.id;
    return fse.readJson(`${this.path}${id}.json`)
    .then((obj) => Object.assign({}, obj, update))
    .then((newObj) => {
      fse.writeJson(`${this.path}${id}`, newObj);
      return newObj;
    });
  };

  this.removeById = (id) => {
    return fse.stat(`${this.path}${id}.json`)
    .then(() => fse.remove(`${this.path}${id}.json`))
    .then(() => true)
    .catch(() => false);
  };

  this.getAllIds = () => {
    return fse.readdir(`${this.path}`)
    .then((files) => files.map((file) => file.replace(/\.[^/.]+$/, '')));
  };

};
