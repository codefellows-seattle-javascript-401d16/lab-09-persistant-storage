'use strict';
const storage = require('../lib/storage.js');

class GameScore{
  constructor (name, score, gameId) {
    this.gameName = name;
    this.score = score;
    this.id = gameId;
  }
  save () {
    console.log('saving', this);
    return storage.setItem(this);
  }

  update () {
    return storage.updateItem(this);
  }

  delete () {
    return storage.deleteItem(this.id);
  }
}

GameScore.findById = (gameId) => {
  return storage.fetchItem(gameId)
    .then((data) => {
      return new GameScore(data.name, data.score, gameId);
    })
    .catch(err => Promise.reject(err));
};

module.exports = GameScore;
