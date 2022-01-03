const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (request, response, next) => {
  const token =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"] ||
    request.headers.authorization;

  if (!token) {
    return response.status(403).send("A token is required for authentication");
  } else {
    try {
      const pureToken = token.slice(7, token.length);
      request.user = jwt.verify(pureToken, process.env.TOKEN_KEY);
      jwt.verify(pureToken, process.env.TOKEN_KEY, (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          request.user = decode;
          next();
        }
      });
    } catch (err) {
      return response.status(401).send("Invalid Token");
    }
  }
};

module.exports = verifyToken;
