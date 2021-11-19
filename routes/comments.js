const { Comment, validate } = require('../models/comments');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const comment = new Comment({
            body: req.body.body,
        });
        await comment.save();
        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

router.get('/', async (req, res) =>{
    try{
        const comment = await Comment.find();
        return res.send(comment);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment)
            return res.status(400).send(`The comment with id "${req.params.id} does not exist.`);
        return res.send(comment);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



module.exports = router;