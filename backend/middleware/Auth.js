const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  var token =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"] ||
    request.headers.authorization;

  var token = token.slice(7, token.length);

  if (!token) {
    return response.status(403).send("A token is required for authentication");
  }
  try {
    request.user = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    return response.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
