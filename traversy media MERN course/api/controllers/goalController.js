const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(201).json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("User not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // checking logged in user with goal's user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorizes");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorizes");
  }

  const goal = await Goal.findByIdAndRemove(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, postGoals, updateGoals, deleteGoals };
