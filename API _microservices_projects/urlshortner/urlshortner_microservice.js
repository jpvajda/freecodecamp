'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var shortUrl = require('./shortUrl');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 

mongoose.connect(process.env.MONGO_URI);


app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.post("/api/new/:url(*)",(req, res) =>{ 
  // es5 var url= req.params.urlToShorten  
  var { url } = req.params;
  var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/gi;
  
 if (regex.test(url)===true) {
     var short = Math.floor(Math.random()*100000).toString();
   
      var data = new shortUrl(
        {
            originalUrl: url,
            shortUrl: short, 
        }
    );
   
     data.save(err => { 
       if (err) { 
         return res.send('Error saving to database');
       }
     });
   
    return res.json(data);
 
 }
  
  var data = new shortUrl(
      { 
            originalUrl: "URL provided doesn't pass regex tests",
            shortUrl: "Invalid URL", 
      }
  );
   return res.json(data);
        
});

app.get("/urlForward", (req, res)=> { 
  // stores the value of param
  var shorterUrl = req.params.urlForward;

  shortUrl.findOne({'shortUrl': shortUrl}, (err, data)=> { 
    if (err) return res.send("Error reading database");
    var re = new RegExp("^(http|https)://", "i");
    var strToCheck = data.originalUrl;
    if(re.test(strToCheck)) { 
      res.redirect(301, data.originalUrl)
    
    } else { 
       res.redirect(301, "http://" + data.originalUrl);
    }
    
  });

});

app.listen(port, function () {
  console.log('Node.js listening ...');
});