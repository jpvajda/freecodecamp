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

app.route("/api/timestamp/:date_string?").get((req, res) => {
  let timestamp =
    req.params.date_string == null
      ? new Date(Date.now())
      : /^[0-9]*$/g.test(req.params.date_string)
      ? new Date(parseInt(req.params.date_string, 10))
      : new Date(req.params.date_string);
  let unixTime = timestamp.getTime();
  res.json(
    Number.isNaN(unixTime)
      ? { error: "Invalid Date" }
      : { unix: unixTime, utc: timestamp.toUTCString() }
  );
});


// Different Approaches that didn't work correctly :/

// app.get("/api/timestamp/:dateVal?", function(req, res) { 
  
//    let date = new Date();
//   let dateVal = req.params.dateVal;
//   console.log(req.params);
  
//   // @TODO Switch statement isn't evaluation the 1st 2 cases... 
  
//   switch(true)
//     { 
//       case 1:
//         dateVal == null;
//         return res.json({ unix: date.getTime(), utc: date.toUTCString()});
    
//       case 2: 
//         dateVal.isNaN; 
//         return res.json({ error: 'Invalid Date' });
   
//       default: 
//         date = Date.parse(dateVal) ? new Date(dateVal) : new Date(Number(dateVal));
//         return res.json({unix: date.getTime(), utc: date.toUTCString()});
//     }    
// });

// Alternative approach using if, else if, else... 

// app.get("/api/timestamp/:dateVal?", function(req, res) { 

// let date = new Date();
//   console.log(req.params);
//   if (req.params.dateVal === undefined) {
//     res.json({ unix: date.getTime(), utc: date.toUTCString()});
  
//   } else if (isNaN(req.params.dateVal)){ 
//   res.json({ error: 'Invalid Date' })
    
//   } else {
//     date = Date.parse(req.params.dateVal) ? new Date(req.params.dateVal) : new Date(Number(req.params.dateVal));
//     res.json({unix: date.getTime(), utc: date.toUTCString()});
//   }  

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


