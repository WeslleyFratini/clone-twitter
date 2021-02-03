const UserService = require("../services/user.service");

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
      const user = UserService.login(body);

      res.send(user);
    } catch (e) {
      res.send({ error: true, message: e.message });
    }
  },
};
