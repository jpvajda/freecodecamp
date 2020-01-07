const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI ,{ useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Import the model / schema 

const User = require(__dirname + '/user.js');

// creates a new user 
app.post('/api/exercise/new-user', (req, res, next) => {
  const username = req.body.username;
  if(username){
    const newUser = {username: username, count: 0, log: []};
    User.findOne({username : newUser.username}, (error, data) => {
      if (error) return next(error);
      if (data) {
        res.send("That username is already taken.");
      } else {
        User.create(newUser, (error, user) => {
          if (error) return next(error);
          res.json({username: user.username, id: user._id});
        });
      }
    });
  } else {
    res.send("You need to provide a username.");
  }
});

// Creates an exercise for a user 
app.post('/api/exercise/new-exercise', (req, res, next) => { 
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = req.body.duration;
  const requiredFieldCompleted = userId && description && duration;
  if(requiredFieldCompleted){ 
    User.findById(userId, (error, user) => { 
    if(error) return next(error);
    if (user) { 
    const date = (req.body.date) ? new Date(req.body.date) : new Date();
      user.count = user.count + 1;
      const newExercise = {description: description, duration: duration, date: date};
      user.log.push(newExercise);
      user.save((error, user) => { 
      if(error) return next(error);
        const dataToShow = { 
        username: user.username,
        _id: user._id,
        description: description,
        duration: duration, 
        date: date.toDateString(),  
        };
      res.json(dataToShow);
    });
  } else { 
    next();
  }
});
  } else { 
  let message = "Complete all required fields.";
   res.send(message); 
  }    
});

// Return all users 

app.get('/api/exercise/users', (req, res, next) => { 
  User.find({}, (error, users) => { 
    res.json(users)
  });
});


// Returns list of all exercises for a user 

app.get('/api/exercise/log', (req, res, next) => { 

const userId = req.query.userId;
  if(userId){ 
    let from = req.query.from;
    let to = req.query.to;
    let limit = req.query.limit;

  const limitOptions = {};
  if (limit) limitOptions.limit = limit;
  User.findById(userId)
    .populate({path: 'log', match:{}, select: '-_id', options: limitOptions})
    .exec((error, user) => { 

        console.error('Testing invalid userId. After looking for the user, before if(error) and if(user).')
        console.error('error: ' + error);
        console.error('user: ' + user);
    
    if(error) return next(error);
      if (user) { 
      const returnData = {id: user._id, username: user.username, count: user.count};
        if (from) returnData.from = from.toDateString();
        if (to) returnData.to = to.toDateString();
        returnData.log = user.log.filter((ej)=> { 
          if (from && to) { 
            return ej.date >= from && ej.date <= to;
          }  else if (from) { 
            return ej.date <= from;
          } else if (to) { 
            return ej.date <=to;
          } else { 
            return true;
          }
        });
        res.json(returnData);
    } else { 
      next();
    }
    });  
  }   
});

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
