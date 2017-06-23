'use strict';

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

let id = '';

describe('testing http methods', () => {
  before(done => server.listen(3000, () => done()));
  after(done => server.close(() => done()));

  describe('testing POST route', () => {
    it('should return 400 status request body invalid', (done) => {
      superagent.post('localhost:3000/api/user')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should return 201 status when request body valid', (done) => {
      superagent.post('localhost:3000/api/user')
        .send({ name: 'michael', password: 'abcd', email: 'michael@stuart.com'})
        .end(((err, res) => {
          id = res.body.id;
          expect(res.status).toEqual(201);
          done();
        }));
    });
  });

  describe('testing GET route', () => {
    it('should return 404 status query invalid', (done) => {
      superagent.get('localhost:3000/api/user?id=invalid')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should return 400 status when query undefined', (done) => {
      superagent.get('localhost:3000/api/user')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should return 200 status and user object when query valid', (done) => {
      superagent.get(`localhost:3000/api/user?id=${id}`)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
    });
  });

  describe('testing PUT route', () => {
    it('should return 400 status when query invalid', (done) => {
      superagent.put('localhost:3000/api/user?id=invalid')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should return 400 status when request body invalid', (done) => {
      superagent.put('localhost:3000/api/user')
        .send({ id: 'invalid' })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should return 202 status when request body valid', (done) => {
      superagent.put('localhost:3000/api/user')
        .send({ id, name: 'mike' })
        .end(((err, res) => {
          expect(res.status).toEqual(202);
          done();
        }));
    });
    it('should return 202 status when query valid', (done) => {
      superagent.put(`localhost:3000/api/user?id=${id}`)
        .send({ name: 'mike' })
        .end(((err, res) => {
          expect(res.status).toEqual(202);
          done();
        }));
    });
  });

  describe('testing DELETE route', () => {
    it('should return 404 status and not found string when query invalid', (done) => {
      superagent.delete('localhost:3000/api/user?id=invalid')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should return 204 status and user object when query valid', (done) => {
      superagent.delete(`localhost:3000/api/user?id=${id}`)
        .end((err, res) => {
          expect(res.status).toEqual(204);
          done();
        });
    });
  });
});
