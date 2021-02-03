const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const UserModel = require("../models/User");

const createToken = (payload) => {
  return jwt.sign(
    {
      iat: moment().unix(),
      exp: moment().add(1, "day").unix(),
      id: payload._id,
    },
    "cloneTwitter"
  );
};

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      const { password } = body;
      const encryptedPassword = bcrypt.hashSync(password, 2);
      const created = await User.create({
        ...body,
        password: encryptedPassword,
      });

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
