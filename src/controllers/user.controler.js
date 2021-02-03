const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const UserModel = require("../models/User");
const userService = require("../services/user.service");
const UserService = require("../services/user.service");

const createToken = (payload) => {
  const { JWT_SECRET } = process.env;
  return jwt.sign(
    {
      iat: moment().unix(),
      exp: moment().add(1, "day").unix(),
      id: payload._id,
    },
    JWT_SECRET
  );
};

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      const created = await UserService.create(body);
      res.send(created);
    } catch (e) {
      res.handleHttpError(e);
    }
  },
  async profile(req, res) {
    try {
      const { user } = req.params;
      const profile = await UserService.profile(user);

      res.send(profile);
    } catch (e) {
      res.handleHttpError(e);
    }
  },
  async login(req, res) {
    try {
      const { body } = req;
      const user = userService.login(body);

      res.send(user);
    } catch (e) {
      res.send({ error: true, message: e.message });
    }
  },
};
