const Task = require("../models/postSchema");

const myPosts = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(200, tasks);
  } catch (error) {
    res.send(404, "Post Not Found");
  }
};

const create = async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  myPosts,
  create,
  update,
  deletePost,
};
