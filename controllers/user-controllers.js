const mongoose = require('mongoose')
const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  getUser(req, res) {
    User.find()
    .populate({ path: 'thoughts'})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id' })
          : Thought.deleteMany({ username: user.username })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Add a Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.id},
        { $push: {friends: req.params.friendId}},
        {runValidators: true, new: true}
    )
        .then((user) => 
        !user
            ? res.status(404).json({message: 'No user with this id'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
  },
  //Deleta a Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: {friends: req.params.friendId} },
        { runValidators: true, new: true }   
    )
         .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  }
};
