const mongoose = require("mongoose");
const Review = require("../models/reviewSchema");

const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pic: { type: String, required: true },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
