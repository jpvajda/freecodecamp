// Working version of this service can be found here: 
//https://fcc-microservice-project-jv.glitch.me

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoint example  
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// GET request to return JSON that formats natural and UNIX dates
app.get("/api/timestamp/:dateVal", function(req, res, next) { 
  
  // Returns the request data for date 
  var dateVal = req.params.dateVal;
  
  // Date formatting options 
  var dateFormattingOptions = { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  if (isNaN(dateVal)){ 
    var naturalDate = new Date(dateVal); 
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    var unixDate = new Date(dateVal).getTime()/1000; 
  }
  
  else { 
    var unixDate = dateVal; 
    var naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
  }
 
  
  res.json({unix: unixDate, natural: naturalDate});
});

// Added another if statement into the original if statement to check off the third user story 
// "If it does not contain a date or Unix timestamp, it returns null for those properties"

// if(isNaN(date)){
//     var naturalDate = new Date(date);
//     if (naturalDate == "Invalid Date"){
//       naturalDate = null;
//       unixDate = null; 
//     }else{
//     naturalDate = naturalDate.toLocaleDateString('en-us', format);
//     var unixDate = new Date(date).getTime()/1000;
//     }
//   }else{
//     var unixDate = date;
//     var naturalDate = new Date(date *1000);
//     naturalDate = naturalDate.toLocaleDateString('en-us', format);
//   }

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});