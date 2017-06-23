'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const GameScore = require('../model/gamescore.js');
const PORT = process.env.PORT || 3000;

describe('GameScore Constructor', () => {
  it('Should return a GameScore Object', () => {
    let newGame = new GameScore(1, 'tetris', 9000);
    expect(newGame.id).toEqual(1);
    expect(newGame.name).toEqual('tetris');
    expect(newGame.score).toEqual(9000);
  });
});

describe('/api/gamescore routes', () => {
  let testGame;
  before(done => {
    server.listen(PORT, () => done());
  });
  after(done => {
    server.close(() => done());
  });
  describe('POST', () => {
    it('Should respond 201 with stringified JSON', done => {
      superagent.post(`localhost:${PORT}/api/gamescore`)
        .send(JSON.stringify({name: 'Sonic', score: '45000'}))
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(201);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Sonic');
          expect(res.body.score).toEqual('45000');
          testGame = res.body;
          done();
        });
    });
    it('Should respond 400 with \'Bad request!\'', done => {
      superagent.post(`localhost:${PORT}/api/gamescore`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('Bad request!');
          done();
        });
    });
  });
  describe('GET', () => {
    it('Should respond 200 with a GameScore', done => {
      superagent.get(`localhost:${PORT}/api/gamescore?id=${testGame.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Sonic');
          expect(res.body.score).toEqual('45000');
          testGame = res.body;
          done();
        });
    });
    it('Should respond 400 with \'Bad request!\'', done => {
      superagent.get(`localhost:${PORT}/api/gamescore`)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('Bad request!');
          done();
        });
    });
    it('Should respond 404 with \'not found!\'', done => {
      superagent.get(`localhost:${PORT}/api/gamescore?id=142`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('not found!');
          done();
        });
    });
  });
  describe('PUT', () => {
    it('Should respond 202 with \'Updated!\'', done => {
      superagent.put(`localhost:${PORT}/api/gamescore`)
        .send(JSON.stringify({id: testGame.id, name: 'Sonic the Hedgehog', height: '50000'}))
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(202);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Sonic the Hedgehog');
          expect(res.body.height).toEqual('50000');
          testGame = res.body;
          done();
        });
    });
  });
});
