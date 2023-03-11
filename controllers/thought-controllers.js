const mongoose = require('mongoose');
const {Thought, User} = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
    .populate({ path: 'reactions'})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: thought._id}},
            { new: true }
        )
      })
      .then(updatedUser => {
        !updatedUser
            ? res.status(404).json({ message: 'No user with this username'})
            : res.json(updatedUser)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((deletedThought) =>
        !deletedThought
          ? res.status(404).json({ message: 'No thought with this id' })
          : res.json({ message: 'Thought deleted!'})
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedThought) =>
        !updatedThought
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(updatedThought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Add a Reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.id},
        { $push: {reactions: req.body}},
        {runValidators: true, new: true}
    )
        .then((reaction) => 
        !reaction
            ? res.status(404).json({message: 'No thought with this id'})
            : res.json(reaction)
        )
        .catch((err) => res.status(500).json(err))
  },
  //Deleta a Reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: {reactions: {reactionId: req.params.reactionId}}},
        { new: true }   
    )
         .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json({ message: 'Reaction deleted!' })
        )
        .catch((err) => res.status(500).json(err));
  }
}