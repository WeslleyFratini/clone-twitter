const UserModel = require("../models/user");

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      const created = await User.create(body);

      res.send(created);
    } catch (e) {
      res.handleHttpError(e);
    }
  },
  profile(req, res) {
    const { user } = req.params;
    const profile = UserModel.find({ user });
    res.send(user);
  },
};
