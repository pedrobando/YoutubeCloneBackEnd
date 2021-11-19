const mongoose = require('mongoose');
const Joi = require('joi');

const replySchema = new mongoose.Schema({
    body: {type: String, required: true, minlength:2, maxlength:500},
    dateModifield: {type: Date, default: Date.now}
})

const Reply = mongoose.model('Reply', replySchema);

function validateReply(reply){
    const schema = Joi.object({
        body: Joi.string().min(2).max(500).required(),
    });
    return schema.validate(reply);
}

exports.Reply = Reply;
exports.validate = validateReply; 
exports.replySchema = replySchema;