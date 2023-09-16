const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
 },
  body: {
     type: String,
     required: true 
    },
  tags: [{ type: String }],
  user: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true
     },
//   answers: [{ type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Answer'
//  }],
  // acceptedAnswer: { 
  //   type: mongoose.Schema.Types.ObjectId,
  //    ref: 'Answer'
  //    },
});

module.exports = mongoose.model('Question', questionSchema);