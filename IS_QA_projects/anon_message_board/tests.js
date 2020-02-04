var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {

    let id;
    
    suite('POST', function() {
      test('Test POST /api/threads:board', function(done){ 
        chai.request(server)
        .post('/api/threads/general')
        .send( { 
          board: 'general',
          text: 'Chai POST test',
          delete_password: 'chai'
        })
        .end((err,res) => { 
          assert.equal(res.status, 200);
          expect(res).to.redirect;

          let idIndex = res.redirects[0].indexOf('?_id');
          id = res.redirects[0].slice(idIndex + 5, res.redirects[0].length);
          done();
        });
      });
      
      test('Empty body test POST /api/threads/:board', function(done) { 
        chai.request(server)
          .post('/api/threads/general')
          .send({})
          .end((err, res) => {  
            assert.equal(res.status, 200);
            assert.equal(res.tect, "Couldn't post new thread");
            done();
          });
      });
    });
  });
  
    suite('GET', function() {
      test('Test GET /api/threads/:board', function(done) { 
        chai.request(server)
        .get('/api/threads/general')
        .end((err, res) => { 
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isArray(res.body[0].replies);
          assert.property(res.body[0], 'text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'bumped_on');
          assert.property(res.body[0], 'replies');
          assert.property(res.body[0], 'replycount');
          assert.isUndefined(res.body[0].reported);
          assert.isUndefined(res.body[0].password);
          done();
        });
      });
    });

    suite('PUT', function() {
      test('Test PUT /api/threads/:board', function(done) { 
        chai.request(server)
        .put('/api/threads/general')
        .send({ board: 'general', report_id: id })
        .end((err, res) => { 
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Report successful.');
          done();
      });   
    });
    
    suite('DELETE', function() {
      test('Test DELETE /api/threads/:board', function(done) { 
        chai.request(server)
          .delete('/api/threads/general')
          .send( { board: 'general', thread_id: id, delete_password: 'chai'})
          .end(( err, res) => { 
            assert.equal(res.status, 200);
            assert.equal(res.text, 'Delete successful.');
            done();
          });
      });
      test('Test DELETE with empty body /api/threads/:board', function(done) { 
        chai.request(server)
          .delete('/api/threads/general')
          .send({})
          .end(( err, res) => { 
            assert.equal(res.status, 200);
            assert.equal(res.text, 'Incorporate password.');
            done();
          });
      });
    });
  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {

    let reply_id;
    
    suite('POST', function() {
      test('Test POST /api/replies/:board', function(done) { 
        chai.request(server)
        .post('/api/replies/general')
        .send( { 
          board:  'general',
          // need to add a real thread id
          thread_id: '12345',
          text: 'POST reply test',
          delete_password: 'chai'
        })
        .end((err, res) => { 
          assert.equal(res.status, 200);
          let isValidRedirect = /\/b\/general\//.test(res.redirects[0]);
          assert.equal(isValidRedirect, true);
          done();
        });
      });
    test('Empty body test POST /api/replies/:board', function(done) { 
      chai.request(server)
      .post('/api/replies/general')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "Couldn't reply to the thread.");
        done();
        });
      });  
    });
    
    suite('GET', function() {
      test('Test GET /api/replies/:board', function(done) {
        chai.request(server)
          .get('/api/replies/general')
          // need to add a real thread id
          .query({ thread_id: '12345' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body.replies);
            assert.property(res.body.replies[0], 'text');
            assert.property(res.body.replies[0], 'created_on');
            assert.isUndefined(res.body.replies[0].reported);
            assert.isUndefined(res.body.replies[0].password);
            reply_id = res.body.replies[0]._id;
            done();
          });   
    });
      test('Test GET with empty query /api/replies/:board', function(done) {
      chai.request(server)
        .get('/api/replies/general')
        .query({})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "Error while retrieving data.");
          done();
        });
    });
  });
   
    suite('PUT', function() {
      test('Test PUT /api/replies/:board', function(done) {
        chai.request(server)
          .put('/api/replies/general')
          .send({ board: 'general', reply_id: reply_id })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'Report successful.');
            done();
          });
      });
      test('Test PUT with empty body /api/replies/:board', function(done) {
        chai.request(server)
          .put('/api/replies/general')
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Couldn't report the reply.");
            done();
          });
      });     
    });
    
    suite('DELETE', function() {
      test('Test DELETE /api/replies/:board', function(done) { 
        chai.request(server)
        .delete('/api/replies/general')
        .send( { board: 'general', thread_id: '12345', reply_id: reply_id, delete_password: 'chai"' })
        .end((err, res)=> { 
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Delete successful.');
          done();
        });
      });
     test('Test DELETE with empty body /api/replies/:board', function(done) { 
       chai.request(server)
       .delete('/api/replies/general')
       .send({})
       .end((err, res) => { 
        assert.equal(res.status, 200);
        assert.equal(res.text, 'Incorrect password.');
        done();
       });
     });   
    });
  });
}); 