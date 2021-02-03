const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const UserModel = require("../models/User");
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
      const profile = await UserModel.find({ user }).populate("posts");

      res.send(profile);
    } catch (e) {
      res.handleHttpError(e);
    }
  },
  async login(req, res) {
    const { body } = req;
    const user = await UserModel.findOne({ email: body.email });

    if (!user) {
      res.send({ error: true, message: "User not found" });
    }
    if (bcrypt.compareSync(body.password, user.password)) {
      res.send({ token: createToken(user) });
    } else {
      res.send({ error: true, message: "Senha incorreta" });
    }
  },
};
