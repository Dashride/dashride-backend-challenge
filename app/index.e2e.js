'use strict';

const request = require('supertest');
const app = require('./index');

describe('GET /ping', function() {
    it('respond with success status code and json', function(done) {
        request(app)
            .get('/ping')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
