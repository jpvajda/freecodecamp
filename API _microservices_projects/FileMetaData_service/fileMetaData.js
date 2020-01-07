'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({dest:'uploads/'});
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/upload', upload.single('file'),(req, res, next) => { 
  return res.json(req.file);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
