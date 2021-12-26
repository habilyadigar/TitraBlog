const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
