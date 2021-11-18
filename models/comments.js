const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {type: String, required: true, minlength:2, maxlength:500},
    dateModifield: {type: Date, default: Date.now}
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;