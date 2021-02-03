const UserModel = require("../models/User");

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
  async profile(req, res) {
    try {
      const { user } = req.params;
      const profile = await UserModel.find({ user }).populate("posts");

      res.send(profile);
    } catch (e) {
      res.handleHttpError(e);
    }
  },
  login(req, res) {
    const { body } = req;
    const user = await UserModel.find({ email: body.email });

    if(!user) {
      res.send({ error: true, message: 'User not found' });
    }
      if (user.password === body.password) {

      }else{
        
      }
  },
};
