const mongoose = require('mongoose');
const { Reply, validate, replySchema } = require('./reply');
const Joi = require('joi');

const commentSchema = new mongoose.Schema({
    text: {type: String, required: true, minlength:2, maxlength:500},
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    reply: [{type: replySchema}],
    dateModifield: {type: Date, default: Date.now}
})

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment){
    const schema = Joi.object({
        text: Joi.string().min(2).max(500).required(),
        like: Joi.number().min(1).max(10000),
        dislike: Joi.number().min(1).max(10000),
    });
    return schema.validate(comment);
}

exports.Comment = Comment;
exports.validate = validateComment; 
exports.commentSchema = commentSchema;