const mongoose = require('mongoose');
const Joi = require('joi');

const replySchema = new mongoose.Schema({
    text: {type: String, required: true, minlength:2, maxlength:500},
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    dateModifield: {type: Date, default: Date.now}
})

const Reply = mongoose.model('Reply', replySchema);

function validateReply(reply){
    const schema = Joi.object({
        text: Joi.string().min(2).max(500).required(),
        like: Joi.number().min(1).max(10000),
        dislike: Joi.number().min(1).max(10000),
    });
    return schema.validate(reply);
}

exports.Reply = Reply;
exports.validateReply = validateReply; 
exports.replySchema = replySchema;