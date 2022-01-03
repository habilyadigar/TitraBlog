var mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
//const URI = "mongodb://localhost:27017/titra";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("DB can't connected: " + err);
  });
