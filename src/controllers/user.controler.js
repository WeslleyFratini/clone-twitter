const e = require("express");
const UserModel = require("../models/user");

const UserController = async (req, res) => {
  try {
    const { body } = req;
    const created = await User.create(body);

    res.send(created);
  } catch (error) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = UserController;
