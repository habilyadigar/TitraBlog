const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100, minlength: 1 },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      maxlength: 300,
      minlength: 10,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 300,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
