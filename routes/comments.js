const { Comment, validateComment } = require("../models/comments");
const { Reply, validateReply } = require("../models/reply");
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

router.post("/", async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error);

    const comment = new Comment({
      text: req.body.text,
      like: req.body.like,
      dislike: req.body.dislike,
      videoid: req.body.videoid,
    });
    
    await comment.save();
    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const comment = await Comment.find();
    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.find({ videoid: req.params.id }).sort({
      dateModified: -1,
    });
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.id} does not exist.`);
        
    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// router.get("/:id", async (req, res) => {
//     try {
//       const comment = await Comment.find({ _id: req.params.id }).sort({
//         dateModified: -1,
//       });
//       if (!comment)
//         return res
//           .status(400)
//           .send(`The comment with id "${req.params.id} does not exist.`);
//           console.log(comment);
//       return res.send(comment);
//     } catch (ex) {
//       return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
//   });

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error);
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        like: req.body.like,
        dislike: req.body.dislike,
        videoid: req.body.videoid,
      },
      { new: true }
    );
    if (!comment)
      return res
        .status(400)
        .send(`The product with id "${req.params.id}" does not exist.`);
    await comment.save();
    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment)
      return res
        .status(400)
        .send(`The product with id "${req.params.id}" does not exist.`);
    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Reply
router.post("/:commentId/replies/", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.commentId}" does not exist.`);

    const reply = new Reply({
      text: req.body.text,
      like: req.body.like,
      dislike: req.body.dislike,
    });
    if (!reply) return res.status(400).send(`Reply doesnt exist.`);
    comment.replies.push(reply);
    await comment.save();
    return res.send(comment.reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:commentId/replies/:replyId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.commentId}" does not exist.`);

    const reply = await Reply.findByIdAndRemove(req.params.replyId);
    if (!reply)
      return res
        .status(400)
        .send(`The reply with id "${req.params.replyId}" does not exist.`);
    return res.send(reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:commentId/replies/", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.commentId}" does not exist.`);

    const reply = comment.replies;
    return res.send(comment.replies);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:commentId/replies/:replyId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(400)
        .send(`The comment with id "${req.params.commentId}" does not exist.`);

    const reply = comment.replies.id(req.params.replyId);
    if (!reply)
      return res
        .status(400)
        .send(`The reply with id ${req.params.replyId} does not exist.`);
    
    return res.send(reply);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:commentId/replies/:replyId", async (req, res) => {
  try {
    const { error } = validateReply(req.body);
    if (error) return res.status(400).send(error);

    if (!req.params.commentId)
      return res
        .status(400)
        .send(`The comment with id "${req.params.commentId}" does not exist.`);

    if (!req.params.replyId)
    return res
      .status(400)
      .send(`The comment with id "${req.params.replyId}" does not exist.`);

    const comment = await Comment.findById(req.params.commentId);
    console.log(comment)
    const reply = comment.replies.id(
      req.params.replyId,
    );
    reply.like= req.body.like,
    reply.dislike= req.body.dislike,
    reply.text= req.body.text
    //console.log(comment)
    await comment.save();

    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
