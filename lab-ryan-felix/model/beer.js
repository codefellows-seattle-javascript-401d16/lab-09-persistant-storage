class Beer {
  constructor({name, style, brewer}, storage) {
    this.beer.name = name;
    this.beer.style = style;
    this.beer.brewer = brewer;
    this.storage = storage;
  }

  save() {
    return this.storage.write(this.beer).then((storedBeer) => {
      this.id = storedBeer.id;
      return storedBeer;
    });
  }

  update(updateInfo) {
    return this.storage.updateById(this.id, updateInfo).then((updatedBeer) => {
      this.beer.name = updatedBeer.name;
      this.beer.style = updatedBeer.style;
      this.beer.brewer = updatedBeer.brewer;
      return updatedBeer;
    });
  }

  remove() {
    return this.storage.removeById(this.id).then((success) => {
      if(success) {
        this.beer = null;
      }
      return success;
    });
  }
}

module.exports = Beer;
