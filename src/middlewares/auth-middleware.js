const jwt = require("jsonwebtoken");

const excludeUrls = ["/login"];

const AuthMiddleware = (req, res, next) => {
  if (excludeUrls.includes(req.path)) {
    next();
  } else {
    const { authorization } = req.headers;
    const { JWT_SECRET } = process.env;

    if (!authorization) {
      res.send({ message: "Url requer autenticação" });
    }

    const decoded = jwt.verify(authorization, JWT_SECRET);
    const now = moment().unix();

    if (now > decoded.exp) {
      res.send({ message: "token expirado" });
    }

    req.decoded = decoded;

    next();
  }
};

module.exports = AuthMiddleware;
