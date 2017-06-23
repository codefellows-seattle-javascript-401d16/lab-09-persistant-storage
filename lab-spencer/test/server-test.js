'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Seahawk = require('../model/seahawk.js');
const fs = require('fs-extra');
const PORT = process.env.PORT || 3000;



describe('/api/seahawks routes', () => {
  let tempSeahawk;

  before(done => {
    fs.ensureDir(`${__dirname}/../data`)
    .then(() => {
      server.listen(PORT, () => done());
    });
  });
  after(done => {
    fs.emptyDir(`${__dirname}/../data`)
    .then(() => server.close(() => done()));
  });

  describe('Seahawk Constructor', () => {
    it('Should return a Seahawk Object', done => {
      new Seahawk('Spencer Gietzen', '5\'10"', '150', 'TB', 'rand/pic.png')
        .save()
        .then(data => {
          expect(data.id).toExist();
          expect(data.name).toEqual('Spencer Gietzen');
          expect(data.height).toEqual('5\'10"');
          expect(data.weight).toEqual('150');
          expect(data.position).toEqual('TB');
          expect(data.picture).toEqual('rand/pic.png');
          done();
        });
    });
  });

  describe('POST', () => {
    it('Should respond 201 with stringified JSON of the player posted', done => {
      superagent.post(`localhost:${PORT}/api/seahawks`)
        .send({name: 'Russell Wilson', height: '6\'11"', weight: '500', position: 'QB', picture: 'testpic/pic.png'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(201);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Russell Wilson');
          expect(res.body.height).toEqual('6\'11"');
          expect(res.body.weight).toEqual('500');
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
          done();
        });
    });
    it('Should respond 400', done => {
      superagent.post(`localhost:${PORT}/api/seahawks`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
  describe('GET', () => {
    it('Should respond 200 with a Seahawk', done => {
      superagent.get(`localhost:${PORT}/api/seahawks?id=${tempSeahawk.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Russell Wilson');
          expect(res.body.height).toEqual('6\'11"');
          expect(res.body.weight).toEqual('500');
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
          done();
        });
    });
    it('Should respond 400', done => {
      superagent.get(`localhost:${PORT}/api/seahawks`)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('Should respond 404', done => {
      superagent.get(`localhost:${PORT}/api/seahawks?id=142`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
  describe('PUT', () => {
    it('Should respond 202', done => {
      superagent.put(`localhost:${PORT}/api/seahawks?id=${tempSeahawk.id}`)
        .send({name: 'Russell Hawk', height: '6\'12"', weight: '185', position: 'QB', picture: 'testpic/pic.png'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(202);
          expect(res.body.id).toEqual(tempSeahawk.id);
          expect(res.body.name).toEqual('Russell Hawk');
          expect(res.body.height).toEqual('6\'12"');
          expect(res.body.weight).toEqual('185');
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
          done();
        });
    });
    it('Should respond 400', done => {
      superagent.put(`localhost:${PORT}/api/seahawks`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('Should respond 404', done => {
      superagent.put(`localhost:${PORT}/api/seahawks?id=999999`)
      .send({name: 'Russell Wilson', height: '6\'12"', weight: '185', position: 'QB', picture: 'testpic/pic.png', id: 9999999})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });
  describe('DELETE', () => {
    it('Should respond 204', done => {
      superagent.delete(`localhost:${PORT}/api/seahawks?id=${tempSeahawk.id}`)
        .end((err, res) => {
          expect(res.status).toEqual(204);
          done();
        });
    });
    it('Should respond 400', done => {
      superagent.delete(`localhost:${PORT}/api/seahawks`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('Should respond 404', done => {
      superagent.delete(`localhost:${PORT}/api/seahawks?id=9999999`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
});
