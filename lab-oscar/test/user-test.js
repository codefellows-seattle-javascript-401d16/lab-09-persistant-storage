'use strict';

const superagent = require('superagent');
const expect = require('expect');
const fs = require('fs-extra');

const server = require('../lib/server.js');

let tempUser;
describe('testing user routes', () => {

  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/user', () => {
    it('should create a new user', (done) => {
      superagent.post('localhost:3000/api/user')
      .send({
              username:'Oscar',
              pwd:'TopSecret',
              fname:'Jonah',
              lname:'cauich'
            })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toExist();
        expect(res.body.username).toEqual('Oscar');
        tempUser = res.body;
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/user')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/user', () => {
    it('should return a user', (done) => {
      superagent.get(`localhost:3000/api/user?id=${tempUser.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempUser.id);
        expect(res.body.username).toEqual('Oscar');
        tempUser = res.body;
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/user')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing PUT /api/user', () => {
    it('should update a record', (done) => {
      superagent.put(`localhost:3000/api/user?id=${tempUser.id}`)
      .send({
              username:'Oscar',
              pwd:'NewPassword',
              fname:'Luis',
              lname:'cauich'
            })
      .end((err, res) => {
        if(err) return done(err);
        tempUser = res.body;
        expect(res.status).toEqual(200);
        expect(res.body.username).toEqual(tempUser.username);
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/user')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing DELETE /api/user', () => {
    it('should delete record', (done) => {
      superagent.delete(`localhost:3000/api/user?id=${tempUser.id}`)
      .end((err, res) => {
        console.log(tempUser);
        if(err) return done(err);
        expect(res.status).toEqual(200);
        done();
      });
    });
  });
});
