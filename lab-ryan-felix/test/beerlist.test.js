const BeerList = require('../model/beerlist.js');
const Storage = require('../lib/storage.js');
const expect = require('expect');

describe('beer list model', () => {

  it('should construct an object', () => {
    const newlyMadeList = new BeerList();
    expect(newlyMadeList).toExist();
  });

  const testStorage = new Storage(`${__dirname}/testdata/`);
  const testList = new BeerList(testStorage);
  const exampleBeer = {
    name: 'Old Rasputin',
    brewer: 'North Coast',
    style: 'Russian Imperial Stout',
  };
  let testBeerId;
  it('should return an added object', (done) => {
    testList.create(exampleBeer)
    .then((returnedBeer) => {
      expect(returnedBeer.id).toExist();
      expect(returnedBeer.name).toEqual(exampleBeer.name);
      expect(returnedBeer.brewer).toEqual(exampleBeer.brewer);
      expect(returnedBeer.style).toEqual(exampleBeer.style);
      testBeerId = returnedBeer.id;
      done();
    })
    .catch((err) => done(err));
  });

  it('should fetch a stored object', (done) => {
    testList.readById(testBeerId)
    .then((returnedBeer) => {
      expect(returnedBeer.id).toEqual(testBeerId);
      expect(returnedBeer.name).toEqual(exampleBeer.name);
      expect(returnedBeer.brewer).toEqual(exampleBeer.brewer);
      expect(returnedBeer.style).toEqual(exampleBeer.style);
      done();
    })
    .catch((err) => done(err));
  });

  it('should update a stored beer', (done) => {
    const changesToBeer = {
      name: 'Old Rasputin',
      brewer: 'North Coast Brewing Co',
    };
    testList.updateById(testBeerId, changesToBeer)
    .then((updatedBeer) => {
      expect(updatedBeer.id).toEqual(testBeerId);
      expect(updatedBeer.name).toEqual(changesToBeer.name);
      expect(updatedBeer.brewer).toEqual(changesToBeer.brewer);
      expect(updatedBeer.style).toEqual(exampleBeer.style);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('should delete a beer', (done) => {
    testList.deleteById(testBeerId)
    .then((result) => {
      expect(result).toEqual(true);
      done();
    })
    .catch(err => done(err));
  });

});
