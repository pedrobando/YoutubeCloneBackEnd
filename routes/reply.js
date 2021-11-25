const { Reply, validateReply } = require('../models/reply');
const express = require('express');
const router = express.Router();

router.post('/:commentId/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const reply = new Reply({
            text: req.body.text,
            like: req.body.dislike,
            dislike: req.body.dislike,
        });
        await reply.save();
        return res.send(reply);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

router.get('/', async (req, res) =>{
    try{
        const reply = await Reply.find();
        return res.send(reply);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const reply = await Reply.findById(req.params.id);
        if(!reply)
            return res.status(400).send(`The comment with id "${req.params.id} does not exist.`);
        return res.send(reply);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



module.exports = router;