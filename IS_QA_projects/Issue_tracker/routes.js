'use strict'

const expect = require('chai').expect;

module.exports = function (app) {

const { getIssues, postIssue, putIssue, deleteIssue, addProjectName } = require('../controllers/issueControllers');
const { getProjects, addProject, removeProject, getProject } = require('../controllers/projectControllers');

  app.route('/api/issues/:project')
    .get(getIssues, addProjectName)
    .post(postIssue)
    .put(putIssue)

  app.route('/api/issues/:project/:issue')
    .delete(deleteIssue);

  app.route('api/projects/')
    .get(getProjects)
    .post(addProject)

  app.route('/api/projects/:project')
    .get(getProject)
    .delete(removeProject)    
};



