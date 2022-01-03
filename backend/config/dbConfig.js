var mongoose = require("mongoose");
require("dotenv").config();

const URI = "mongodb://localhost:27017/titra";
mongoose.connect(
  process.env.MongoDB_URL || URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB Successfully");
  }
);
