'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const fs = require('fs-extra');
// let tempProfile;

//this starts and stops the server for each test.
describe(`Testing all climber profile routes`, function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });
  //!!comment in when I want to clear the dir!!
  after(() => {
    return fs.emptyDir(`${__dirname}/../data/`);
  });

  describe(`Testing POST method on /api/climberprofile`, () =>{
    describe(`Testing successful profile creation`, () => {
      it(`should respond with a profile, 201 status, and create file.`, (done) => {
        superagent.post('localhost:3000/api/climberprofile')
          .send({age: `30`, type: `trad`})
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(201);
            expect(res.body.id).toExist();
            expect(res.body.age).toEqual(`30`);
            expect(res.body.type).toEqual(`trad`);
            expect(`${__dirname}/../data/${res.body.id}}`).toExist();
            tempProfile = res.body;
            done();
          });
      });
    });
    it('should respond with a 400 error', (done) => {
      superagent.post('localhost:3000/api/climberprofile')
        .send()
        .end((err) => {
          expect(err.status).toEqual(400);
          done();
        });
    });
  });

  describe(`Testing GET method on /api/climberprofile`, () => {
    describe(`Testing if the request was successful`, () => {
      it(`should respond with a 200 and specific profile`, (done) => {
        superagent.get(`localhost:3000/api/climberprofile?id=10a4c780-5911-11e7-9505-b18b3ea6f281`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toExist();
            expect(res.body.age).toEqual(`30`);
            expect(res.body.type).toEqual(`trad`);
            done();
          });
      });
    });
    describe(`Testing if the request didn't have a query id attached`, () =>{
      it(`should respond with a 400`, (done) => {
        superagent.get('localhost:3000/api/climberprofile')
          .end((err) => {
            expect(err.status).toEqual(400);
            done();
          });
      });
    });
    describe(`Testing if the request didn't find id`, () => {
      it(`should respond with a 404`, (done) => {
        superagent.get('localhost:3000/api/climberprofile?id=1234')
          .end((err) => {
            expect(err.status).toEqual(404);
            done();
          });
      });
    });
  });

  describe(`Testing PUT method on /api/climberprofile\n`, () =>{
    describe(`if valid id and content is passed in\n`, () => {
      it(`it should respond with a 202 status and {age: '23', type: 'sport'} if successfully updated`, (done) => {
        superagent.put(`localhost:3000/api/climberprofile?id=f2f664c0-5927-11e7-9e6d-9513b4ef41de`)
          .send({age: '23', type: 'sport'})
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(202);
            expect(res.body.id).toExist();
            expect(res.body.age).toEqual('23');
            expect(res.body.type).toEqual('sport');
            done();
          });
      });
    });
    describe(`if bad content is passed through`, () => {
      it(`should respond with a 400`, (done) => {
        superagent.put(`localhost:3000/api/climberprofile?id=f2f664c0-5927-11e7-9e6d-9513b4ef41de`)
          .end((err) => {
            expect(err.status).toEqual(400);
            done();
          });
      });
    });
  });

  describe(`Testing DELETE method on /api/climberprofile\n`, () =>{
    describe(`if profile is successfully deleted\n`, () => {
      it(`it should respond with a 204`, (done) => {
        superagent.delete(`localhost:3000/api/climberprofile?id=e8ff7aa0-5937-11e7-9544-5704902b6a3b`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(204);
            expect(res.body.id).toNotExist();
            expect(res.body.age).toNotExist();
            expect(res.body.type).toNotExist();
            done();
          });
      });
    });
    describe(`if the id is not found\n`, () => {
      it(`should respond with a 404 if id is not found`, (done) => {
        superagent.delete(`localhost:3000/api/climberprofile?id=01234`)
          .end((err) => {
            expect(err.status).toEqual(404);
            done();
          });
      });
    });
  });
});
