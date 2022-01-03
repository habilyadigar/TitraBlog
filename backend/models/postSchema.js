const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true, maxlength: 500, minlength: 1 },
    name: { type: String },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title alanı zorunludur."],
      maxlength: [100, "100 karakterden küçük olmalıdır."],
      minlength: [1, "1 karakterden büyük olmalıdır.)"],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subtitle: { type: String, required: true, maxlength: 500, minlength: 1 },
    author: { type: String, required: true, maxlength: 200, minlength: 1 },
    content: { type: String, required: true, maxlength: 100000, minlength: 50 },
    category: { type: String, required: true, maxlength: 200, minlength: 1 },
    image: { type: String },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
