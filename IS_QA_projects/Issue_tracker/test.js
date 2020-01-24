const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const Issue = require('../models/issue');
const Project = require('../models/project')

chai.use(chaiHttp);


const createTestIssue = function(done, issue_title, cb) { 
  const issue = new Issue({ 
    issue_title,
    issue_text: 'test-issue',
    created_by: 'qa-user'
  });

issue.save()
  .then(function(rec) { 
    console.log(`created test issue ${rec.issue_title}`);
    if (cb) cb(rec._id);
    done();
  });
}

const deleteTestIssue = function(done, filter) { 
  const filterKey = Object.keys(filter)[0];
  Issue.findOneAndDelete(filter)
    .then(function(rec) { 
      console.log(`test issue ${rec[filterKey]} deleted`);
      done();
    })
    .catch(function(err) { 
      console.error(err.message);
      done();
    });
}

const deleteTestProject = function(done, filter) { 
  const filterKey = Object.keys(filter)[0];
  Project.findOneAndDelete(filter)
    .then(function(rec) { 
      console.log(`test project ${rec[filterKey]} deleted`);
      done();
    })
    .catch(function(err) { 
      console.error(err.message);
      done();
    })
}

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
        let issue_title = `test-title${Date.now()}`;

        afterEach(function(){ 
          deleteTestIssue(done, { issue_title });  
        });

      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'functional qa-test Every field filled in.',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, issue_title);
          assert.equal(res.body.issue_text, issue_text);
          assert.equal(res.body.created_by, 'functional qa-test required fields filled in.');
          assert.equal(res.body.assigned_to, 'Chai-Mocha');
          assert.equal(res.body.status_text, 'In-QA');
          assert.equal(res.body.open, true);       
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title,
            issue_text: 'text',
            created_by: 'Functional Test - Required fields filled in'
          })
          .end(function(err, res) {
            assert.equal(res.body.issue_title, issue_title);
            assert.equal(res.body.issue_text, 'text');
            assert.equal(res.body.created_by, 'Functional Test - Required fields filled in');
            assert.equal(res.body.assigned_to, '');
            assert.equal(res.body.status_text, '');
            assert.equal(res.body.open, true);
            done();
          });
      });
    
      test('Missing required fields', function(done) {
        chai.request(server)
        .post('api/issues/test')
        .send( { 
          issue_title,
          created_by: 'functional qa-test missing required fields.' 
        })
        .end(function(err, res) { 
          assert.equal(res.status, 200);
          assert.property(res.body, 'message');
          assert.propertyVal(res.body, 'message', 'missing required fields');
          done();
            });
         });
      });

    suite('PUT /api/issues/{project} => text', function() {
        let testId;
        let issue_title = `test-title${Date.now()}`;


        before(function(done) { 
          createTestIssue(done, issue_title, function(id) { 
            test = id;
            return;
          });
        });
      

        after(function(done) { 
          deleteTestIssue(done, {_id: testId });
        });

      test('No body', function(done) {
        chai.request(server)
          .put('api/issues/test')
          .send({_id: testId})
          .end(function(err, res) { 
           assert.equal(res.status, 200);
           assert.property(res.body, 'message');
           assert.equal(res.body.message, 'no updated field sent');
           done();
          });
      });
      
      test('One field to update', function(done) {
        
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
          .put('api/issues/test')
          .send({ 
            _id: testId,
            issue_title: 'updated-title'
          })
          .end(function(err, res){ 
            assert.equal(res.status, 200);
            assert.property(res.body, 'message');
            assert.equal(res.body.message, 'no updated field sent');
            done();
          });
      });

      test('One field to update', function(done){ 
        chai.request(server)
          .put('api/issues/test')
          .send({ 
            _id: testId,
            issue_title: 'updated-title'
          })
          .end(function(err, res) { 
            assert.equal(res.status, 200);
            assert.property(res.body, 'message');
            assert.equal(res.body.message, `successfully updated ${testId}`);
            done();
          });
      }); 

      test('Multiple fields to update', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: testId,
            issue_title: 'updated-title',
            issue_text: 'updated-text'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'message');
            assert.equal(res.body.message, `successfully updated ${testId}`);
            done();
          });
      });


      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
        let issue_title = `test-title${Date.now()}`;

        before(function(done) { 
          createTestIssue(done, issue_title);
        });

        after(function(done){ 
          deleteTestIssue(done, { issue_title});
        });
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({ issue_text: 'test-hook' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({ issue_text: 'test-hook', created_by: 'test-hook' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });     
      });
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      let testId;
      let issue_title = `test_title${Date.now()}`;

      before(function(done) { 
        createTestIssue(done, issue_title, function(id) { 
          testId = id;
          return;
        });
      });
      
      test('No _id', function(done) {
        chai.request(server)
        .delete(`/api/issues/test/${testId}`)
        .end(function(err, res) { 
          assert.equal(res.status, 200);
          assert.property(res.body, 'message');
          assert.equal(res.body.message, 'could not delete fake-id');
          done();
        });
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
        .delete(`/api/issues/test/${testId}`)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'message');
          assert.equal(res.body.message, `deleted ${testId}`);
          done();
      });
    });
  });

  suite('POST /api/projects/ => text', function(){ 
    const testProjectName = 'test-post-project-name' + Date.now();

    after(function(done) { 
      deleteTestProject(done, {project_name: testProjectName});
    });

    test('New project name sent', function(done) { 
      chai.request(server)
        .post('/api/projects/')
        .send({
          project_name: testProjectName
        })
        .end(function(err, res) { 
          assert.equal(res.status, 200);
          assert.equal(res.body.message, `project ${testProjectName} created`);
          done();
        });
      });

      test('Existing project name sent', function(done) {
        chai.request(server)
          .post('/api/projects')
          .send({
            project_name: testProjectName
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, `project ${testProjectName} already exists`);
            done();
          });
      });
  });

  suite('GET /api/projects/ => Array of projects', function() {
    test('Valid response from API', function(done) {
      chai.request(server)
        .get('/api/projects')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body.projects);
          done();
        });
    });
  });

  suite('DELETE /api/projects/{project} => text', function() {
    const testProjectName = 'test-delete-project-name';
    const testNonProjectName = 'test-delete-non-project-name';

    before(function(done) {
      createTestProject(done, testProjectName);        
    });

    test('Endpoint with existing project', function(done) {
      chai.request(server)
        .delete(`/api/projects/${testProjectName}`)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, `project ${testProjectName} deleted`);
          done();
        });
    });

    test('Endpoint with non-existing project', function(done) {
      chai.request(server)
        .delete(`/api/projects/${testNonProjectName}`)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, `project ${testNonProjectName} not found`);
          done();
        });
    });
  });

  test('Endpoint with non-existing project', function(done) {
    chai.request(server)
      .delete(`/api/projects/${testNonProjectName}`)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, `project ${testNonProjectName} not found`);
        done();
      });
  });


suite('GET /projects/{project} => project page', function() {
  test('Get project page', function(done) {
    chai.request(server)
      .get('/{project}')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
    });
  });
});

