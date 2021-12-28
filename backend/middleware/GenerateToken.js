const jwt = require("jsonwebtoken");
require("dotenv").config();

const GenerateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.TOKEN_KEY || "secretJWT",
    {
      expiresIn: process.env.TOKEN_EXP || "1h",
    }
  );
};

module.exports = GenerateToken;
