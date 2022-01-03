const Post = require("../models/postSchema");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send("Post Not Found");
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
  if (req.user) {
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
  } else {
    res.status(400).send({ message: "User not found" });
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

const comment = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (post) {
    if (post.reviews.find((x) => x.name === req.user.name)) {
      return res.status(400).send({ message: "Daha önce yorum yaptınız!" });
    }
    const review = {
      name: req.user.name,
      comment: req.body.comment,
    };
    post.reviews.push(review);
    const updatedPost = await post.save();
    res.status(201).send({
      message: "Review Adeed",
      review: updatedPost.reviews[updatedPost.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: "Product Doesn't exist" });
  }
};

module.exports = {
  create,
  update,
  deletePost,
  postWithId,
  getPosts,
  comment,
};
