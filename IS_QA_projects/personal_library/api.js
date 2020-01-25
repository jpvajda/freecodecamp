'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;

module.exports = function (app) {

  // Book object constructor 

// function Book() { 
//   this.title = String,
//   this.comments = [String],
//   this.commentcount =  { type: Number, default: 0 }
// };

//   let Book = new Book;

const Book = new Book({
    title: String,
    comments: [String],
    commentcount: { type: Number, default: 0 }
});
  
  
  // get all books 
  app.route('/api/books')
    .get(function (req, res){
     Book.find({}, (err, docs) => { 
       if (err) throw err;
       res.send(docs);
      })
    })
  
    // create a new bookitle
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
  
    // get a single book);
  app.route('/api/books/:id')
    .get(function (req, res){
    const {_id} = req.params;
    Book.findById(_id, (err, doc) => { 
        if (err || !doc) return res.send('no book exists');
        res.send(doc);
      })
    })

    // create a comment 
    .post(function(req, res) {
      const {_id} = req.params; 
      const { comment } = req.body;
      Book.findByIdAndUpdate(_id), { $push: { comments: comment }, $inc: { commentcount: 1}}, { new: true}, (err, doc) => {
        if (err) return res.send('no book exists');
          res.send(doc);
      } 
    })
  
    // delete a single book 
    .delete(function(req, res){  
      const  {_id} = req.params;
      Book.findByAndRemove(_id, err => { 
        if (err) return res.send('no book exists');
        res.send('complete delete successful');
      })
    });
  
};
