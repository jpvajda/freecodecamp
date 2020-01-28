'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = function (app) {

 
// Book Schema 

const bookSchema = new mongoose.Schema({
    title: String,
    comments: [String],
    commentcount: { type: Number, default: 0 }
});
  
var Book = mongoose.model('Book', bookSchema);
  
  // get all books 
  app.route('/api/books') 
    .get(function (req, res){
     Book.find({}, (err, docs) => { 
       if (err) throw err;
       res.send(docs);
       console.log(docs);
      })
    })
  
    // create a new book
    .post(function (req, res){
      const title = req.body.title;
      if (!title) return res.send('no title given');
      Book.create( { title }, (err, doc) =>{ 
        if (err) throw err;
        res.send(doc);
      })
    })
  
     // delete all books    
     .delete(function(req,res) { 
      Book.deleteMany({}, (err, docs) => { 
        if (err) return res.send('complete delete unsuccessful');
        res.send('complete delete successful')
      })
    })
  
    // get a single book
  app.route('/api/books/:id')
    .get(function (req, res, next){
    const id = req.body.id; 
    Book.findById(id, (err, doc) => { 
        if (err || !doc) return res.send('no book exists');
        res.send(doc);
        console.log(id);
        console.log(doc);
      })
    })

    // create a comment 
    .post(function(req, res) {
      const id = req.body.id; 
      const comment = req.body.comment;
      Book.findByIdAndUpdate(id, { $push: { comments: comment }, $inc: { commentcount: 1}}, { new: true}, (err, doc) => {
        if (err) return res.send('no book exists');
           res.send(doc);  
          console.log(id);
          console.log(doc);  
      }) 
    })

    // delete a single book 
    .delete(function(req, res){  
      const id = req.body.id;
      Book.findByIdAndRemove(id, err => { 
        if (err) return res.send('no book exists');
        res.send('complete delete successful');
      })
    }); 
};
