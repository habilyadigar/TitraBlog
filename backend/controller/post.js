const Post = require("../models/postSchema");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(200, posts);
  } catch (error) {
    res.send(404, "Post Not Found");
  }
};

const postWithId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    user: req.user._id,
    author: req.user.name,
    subtitle: req.body.subtitle,
    content: req.body.content,
    category: req.body.category,
    image: req.body.image,
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const update = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  create,
  update,
  deletePost,
  postWithId,
  getPosts,
};
