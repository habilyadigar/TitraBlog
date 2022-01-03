const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const GenerateToken = require("../middleware/GenerateToken");
const Post = require("../models/postSchema");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({
      email: email,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: GenerateToken(user),
      });
    } else res.status(400).send("Invalid Credentials");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const register = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hashSync(req.body.password, 10),
  });
  const createdUser = await user.save();
  res.status(200).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: GenerateToken(user),
  });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
};

const getUserPosts = async (req, res) => {
  console.log(req.user);
  try {
    const posts = await Post.find({
      user: req.user._id,
    });

    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send("User's posts not found");
  }
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: GenerateToken(updatedUser),
    });
  } else {
    res.status(400).send("User not found");
  }
};

module.exports = { login, register, getUser, updateUser, getUserPosts };
