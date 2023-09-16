const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  isAccepted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Answer', answerSchema);
