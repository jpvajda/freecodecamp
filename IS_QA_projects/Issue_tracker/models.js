// issues model

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


// issue object & schema 

const IssueSchema = new Schema({
  issue_title: {
    type: String,
    required: true,
    min: 1,
    max: 30
  },
  issue_text: {
    type: String,
    required: true,
    min: 1,
    max: 200
  },
  created_by: {
    type: String,
    required: true,
    min: 1,
    max: 30
  },
  assigned_to: {
    type: String,
    default: '',
    min: 1,
    max: 30
  },
  status_text: {
    type: String,
    default: '',
    min: 1,
    max: 30
  },
  created_on: {
    type: String,
    default: new Date()
  },
  updated_on: {
    type: String,
    default: new Date()
  },
  open: {
    type: Boolean,
    default: true
  },
  project: {
    type: String,
    required: true
  }
});

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;

// projects model 

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


//  project object & schema 
const ProjectSchema = new Schema({
  project_name: {
    type: String, 
    required: true,
    min: 1,
    max: 30
  },
  issues: [{
      type: [Schema.Types.ObjectId],
      ref: 'Issue',
    }
  ]
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;