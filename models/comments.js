const mongoose = require('mongoose');
const Joi = require('joi');

const commentSchema = new mongoose.Schema({
    body: {type: String, required: true, minlength:2, maxlength:500},
    like: {type: number, default: 0},
    reply: { reply},
    dateModifield: {type: Date, default: Date.now}
})

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment){
    const schema = Joi.object({
        body: Joi.string().min(2).max(500).required(),
    });
    return schema.validate(comment);
}

exports.Comment = Comment;
exports.validate = validateComment; 
exports.commentSchema = commentSchema;