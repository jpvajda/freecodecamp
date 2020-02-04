// Thread

const mongoose = require('mongoose');
const Reply = require('./reply.js');
const Schema   = mongoose.Schema

const threadSchema = Schema ({ 
  _id: Schema.Types.ObjectId,
  text: { type: String, required: true },
  password: { type: String, required: true} ,
  created_on: { type: Date, default: Date.now },
  bumped_on: { type: Date, default: Date.now },
  reported: { type: Boolean, default: false},
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply'}],
});

threadSchema.post('remove', function(doc) {
  Reply.deleteMany({
    _id: { "$in": doc.replies }
  }, {}, function(err) {});
});


module.exports = mongoose.model('Thread', threadSchema)
;

// Reply 

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const replySchema = Schema ({ 
  _id: Schema.Types.ObjectId,
  text: { type: String, required: true, maxlength: 3000 },
  password: { type: String, required: true, minlength: 4, maxlength: 15} ,
  created_on: { type: Date, default: Date.now },
  reported: { type: Boolean, default: false}
});

module.exports = mongoose.model('Reply', replySchema);

// Board

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const boardSchema = Schema ({ 
  _id: Schema.Types.ObjectId,
  board_name: { type: String, required: true, minlength: 3, maxlength: 10},
  threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }]
});

module.exports = mongoose.model('Board', boardSchema);

