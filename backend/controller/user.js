const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { ...user.dataValues, password: undefined },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_EXP,
        }
      );
      res.status(200).send({ token });
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
  res.status(200).send(createdUser);
};

module.exports = { login, register };
