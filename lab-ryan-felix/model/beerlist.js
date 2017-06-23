module.exports = function(storage) {
  this.storage = storage;
  this.create = (newBeer) => {
    if(!(newBeer.name && newBeer.style && newBeer.brewer)) {
      return Promise.reject(new Error('Invalid beer object.'));
    }
    const beerToAdd = {
      name: newBeer.name,
      style: newBeer.style,
      brewer: newBeer.brewer,
    };
    return this.storage.write(beerToAdd).catch(() => null);


  };

  this.readById = (id) => {
    const found = this.storage.readById(id);
    return found;
  };

  this.updateById = (id, beer) => {
    const oldBeer = this.storage.readById(id);
    if(!oldBeer) {
      return null;
    }
    return this.storage.updateById(id, beer);
  };

  this.deleteById = (id) => {
    return this.storage.removeById(id);
  };

  this.getAllIds = () => {
    return this.storage.getAllIds();
  };

};
