// Issues controller 

const Project = require('../models/project');
const Issue = require('../models/issue');



const getIssues = function(req, res, next) { 
  const filters = req.query;
  filters.project = req.params.project;

Issue.find(filters)
  .then(function(recs) { 
    res.locals.recs = recs;
    next();
  })
  .catch(function(err) { 
    console.error(err.message);
    res.sendStatus(500);
  });
}

const addProjectName = function(req, res) { 
  const project = req.params.project;

Project.findById(project)
  .then(function(rec){ 
const response = { issues: res.locals, project_name: rec.project_name };
    res.json(response);
  });
}

const postIssue = function(req, res) { 
  const projectId = req.params.project.toString();
  const issue = new Issue( { 
    issue_title: req.body.issue_title,
    issue_text: req.body.issue_text,
    created_by: req.body.created_by,
    assigned_to: req.body.assigned_to,
    status_text: req.body.status_text,
    created_on: new Date(),
    updated_on: new Date(),
    project: projectId
  });

issue.save()
  .then(function(doc) { 
    Project.findByIdAndUpdate(projectId, {$push: { issues: doc._id } } )
    .then(function(proj) { 
      console.log('issue created', doc);
      res.json(doc);
    });
  })
  .catch(function(err) { 
    console.log(err.message);
    res.json({ message: 'missing required fields'});
  });
}

const putIssue = function (req, res) { 
  let update = {};

  const allowedFieldsToBeUpdated = ['issue_title', 'issue_text', 'created_by', 'assigned_to', 'status_text', 'open'];
  for (let field in req.body) { 
    allowedFieldsToBeUpdated.forEach(val => { 
      if (val == field) update[field] = req.body[field];
    });
  }

update.updated_on = new Date();

const updateExists = Object.keys(update).length > 1;

if (updateExists) { 
  Issue.findByIdAndDelete(req.body._id, update, {new: true})
    .then(function(doc){ 
      const message = `successfully updated ${doc._id}`;
      console.log(message);
        return res.json({message});
    });
} else { 
  res.json({ message: 'no updated field sent' });
  }
}

const deleteIssue = function(req, res) {
  const _id = req.params.issue.toString()
  if (_id) {
    Issue.findByIdAndDelete(_id)
      .then(function(rec) {
        const message = `deleted ${_id}`;
        console.log(message);
        res.json({ message });
      })
      .catch(function (err) {
        const message = `could not delete ${_id}`;
        console.error(err.message);
        res.json({ message });
      });
  } else {
    console.log('issue delete failed: no _id');
    res.json({ message: '_id error' });
  }
}

module.exports = { 
  getIssues,
  postIssue,
  putIssue,
  deleteIssue,
  addProjectName,
};

// projects controller 

const Project = require('../models/project');



const getProjects = function(req, res) { 
  Project.find({})
  .select( { project_name: 1})
  .then(function(recs){ 
    console.log('project returned'); 
    res.json( {projects: recs });
  })
  .catch(function(err) { 
    console.error(err.message);
    res.sendStatus(500);
  }) 

}

const getProject = function(req, res) { 
  const projectId = req.params.project.toString();
  Project.findById(projectId)
  .populate('issues')
  .then(function(rec) { 
    if (rec) { 
      res.json(rec);
      res.sendStatus(404);
    }
  })
  .catch(function(err) { 
    console.error(err.message);
    res.sendStatus(500);
  });
}

const addProject = function(req, res) { 
  console.log(req.body)
  const project_name = req.body.project_name.toString();

  Project.findOne ({ project_name})
    .then(rec => { 
      if (rec) {
        let message =  `project ${rec.project_name} already exists`;
        console.log(message);
        res.json( { message });
      } else {
        let project = new Project( { project_name});
        project.save()
        .then(rec => { 
          let message = `project ${rec.project_name} created`;
            console.log(message);
            res.json( { message, _id: rec._id});
        })
        .catch(err => { 
          console.error(err.message);
          res.sendStatus(500);
        });
      }
    })
    .catch(err => { 
      console.error(err.message);
      res.sendStatus(500);
    });
}

const removeProject = function(res, req) { 
  const projectId = req.params.project.toString();
  Project.findByIdAndDelete(projectId)
    .then(rec => { 
      let message;
        if (rec) { 
          message = `project ${rec.project_name} deleted`;
        } else {
          message = `project ${projectId} not found`;
        }
        console.log(message);
        res.json( {message} );
    })
    .catch(err => { 
      console.log(err.message);
      res.sendStatus(500)
    })
}

module.exports = { 
  getProjects,
  getProject,
  addProject,
  removeProject
};