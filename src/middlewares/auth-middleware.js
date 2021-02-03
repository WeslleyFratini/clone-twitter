const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res) => {
  const { authorization } = req.headers;
  const { JWT_SECRET } = process.env;

  const decoded = jwt.verify(authorization, JWT_SECRET);
  next();
};

module.exports = AuthMiddleware;
