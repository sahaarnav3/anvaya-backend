const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',  // Reference to the Lead model
    required: [true, 'Lead reference is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesAgent',  // Reference to the SalesAgent who authored the comment // And keep it is default to the agent which is selected on lead details.
    required: [true, 'Author is required'],
  },
  commentText: {
    type: String,
    required: [true, 'Comment text is required'],
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);