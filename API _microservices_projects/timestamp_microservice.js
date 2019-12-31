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
app.get("/api/timestamp/:dateVal?", function(req, res) { 
  
  let date = new Date();
  console.log(req.params);
  if (req.params.dateVal === undefined) {
    res.json({ unix: date.getTime(), utc: date.toUTCString()});
  } else if (req.params.dateVal === 'Invalid Date'){ 
    res.json({ error: 'Invalid Date' })
  } else {
    date = Date.parse(req.params.dateVal) ? new Date(req.params.dateVal) : new Date(Number(req.params.dateVal));
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});