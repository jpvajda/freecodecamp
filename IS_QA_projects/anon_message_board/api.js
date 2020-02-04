`use strict`

const mongoose    = require('mongoose');
const expect = require('chai').expect;

const Board = require('../models/board.js');
const Thread = require('../models/thread.js');
const Reply = require('../models/reply.js');


// connect to db
const mongoOptions = { 
  useNewUrlParser: true,
  useFindAndModify: false,
}

mongoose.connect(process.env.DB, mongoOptions)
  .then(()=> console.log('connected successfully to mongodb'))
  .catch(err => { 
    console.error(err.stack)
  });

module.exports = function (app) {
  
  app.route('/api/threads/:board')
  .get((req, res) => { 

   Board.findOne({ board_name: req.params.board })
    .populate({ 
      path: 'threads',
      select: '-reported -password',
      options: { limit: 10, sort: { bumped_on: -1 } },
      populate: { path: 'replies',
                  model: 'Reply',
                  options: { sort: {created_on: -1 } },
                }
  })

  .select('threads')
  .exec((err, docs) => { 
    if(err || !docs)
    return res.end("Error while retrieving threads.");

    let threads = docs.threads.map((thread) => { 
    
    let replies = thread.replies.slice(0, 3);
    let threadReply = { 
      _id: thread._id,
      text: thread.text,
      created_on: thread.created_on,
      bumped_on: thread.bumped_on,
      replies: replies,
      replycount: thread.replies.length
    }
    return threadReply;
    });

    return res.json(threads);
  });
})

  .post((req, res) => { 
    let board;
    Board.findOne({ board_name: req.params.board }), ((err, doc) =>{ 
      if (err)
        return res.send("Couldn't post new thread");
      if(doc)
        board = doc;
      else 
      board = new Board({ 
        _id: mongoose.Types.ObjectId(),
        board_name: req.params.board
      });

      let newThread = new Thread({ 
        _id: new mongoose.Types.ObjectId(),
        text: req.body.text,
        password: req.body.delete_password,
        created_on: new Date(),
        bumped_on: new Date(),
        reported: false
      });
    
      board.threads.push(newThread);

      newThread.save((err) => { 
        if (err)
            return res.send("Couldn't post new thread");

        return res.redirect(`/b/${board.board_name}?_id=${newThread._id}`);            
      });
    });
  })
    
  .put((req, res) => { 
  Thread.findByIdAndUpdate(
    req.body.report_id,
    { $set: { reported: true } },
    (err, doc) => {
      if(err || !doc)
        return res.send("Couldn't report the thread.");
      
      return res.send('Report successful.');
    });
})

  .delete((req, res) => { 

      Board.findOne({ board_name: req.params.board })
        .populate( { 
          path: 'threads',
          match: { 
            _id: req.body.thread_id,
            password: req.body.delete_password
          }
    })
    .select('threads')
    .exec((err, doc)=> { 
      if (err || doc.threads.length === 0)
        return res.send('Incorrect password.');

        Board.findOneAndUpdate(
          { board_name: req.params.board },
          { $pull: { threads: req.body.thread_id } },
        (err, doc => {}));

      doc.threads[0].remove();

      return res.send('Delete successful.');
    });
  });

  app.route('/api/replies/:board')
  .get ((req, res) => { 

    if (!req.query.thread_id)
      return res.send("Error while retrieving data.");

      Board.findOne( { board_name: req.params.board })
        .populate({ 
          path: 'threads',
          match: { _id: req.query.thread_id },
          populate: { 
                path: 'replies',
                model: 'Reply',
                select: '-reported -password',
            }
        })

        .select('threads')
        .exec((err, docs) => { 
          if(err)
            return res.send("Error while retrieving data.");

            return res.json(docs.threads[0]);
        });
  })

  .post((req, res) => { 
       
        Board.findOne({ board_name: req.params.board })
        .populate({
          path: 'threads',
          match: { _id: req.body.thread_id }
        })
        .select('threads')
        .exec(function(err, doc) {
          if(err || !doc || doc.threads.length === 0)
            return res.send("Couldn't reply to the thread.");
                
         
          let newReply = new Reply({
            _id        : mongoose.Types.ObjectId(),
            text       : req.body.text,
            password   : req.body.delete_password,
            created_on : new Date(),
            reported   : false
          });
        

          doc.threads[0].bumped_on = new Date();
        
          doc.threads[0].replies.push(newReply);
        
        
          newReply.save(function(err) {
            if(err)
              return res.send("Couldn't reply to the thread.");
            
          
            doc.threads[0].save(function(err) {
              if(err)
                return res.send("Couldn't reply to the thread.");
     
              return res.redirect(`/b/${req.params.board}/${req.body.thread_id}`);
            });
          });
        });
    })
    .put(function(req, res) {
    
      Reply.findByIdAndUpdate(
        req.body.reply_id,
        { $set: { reported: true } },
        function(err, doc) {
          if(err || !doc)
            return res.send("Couldn't report the reply.");
          
          return res.send('Report successful.');
        });
    })
    .delete(function(req, res) {
    
      Board.findOne({ board_name: req.params.board })
        .populate({
          path: 'threads',
          match: { _id: req.body.thread_id },
          populate: { path: 'replies',
                      model: 'Reply',
                      match: { _id: req.body.reply_id,
                               password: req.body.delete_password }
                             }
        })
        .select('replies')
        .exec(function(err, doc) {
          
          if(err || !doc || (doc.threads.length === 0)
              || (doc.threads[0].replies.length === 0))
            return res.send('Incorrect password.');
            
            Thread.findOneAndUpdate(
              { _id: req.body.thread_id },
              { $pull: { replies: req.body.reply_id } },
              (err, doc) => {});

            doc.threads[0].replies[0].remove();

          return res.send('Delete successfull.');
      });
    });

};
