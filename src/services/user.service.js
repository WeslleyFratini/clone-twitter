const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async create(data) {
    const { password } = data;
    const encryptedPassword = bcrypt.hashSync(password, 2);

    return await UserModel.create({ ...data, password: encryptedPassword });
  },
  async profile(user) {
    return await UserModel.find({ user }).populate("posts");
  },
  async login(data) {
    const user = await UserModel.findOne({ email: data.email });

    if (!user) {
      throw new Error("User not found");
    }

    if (bcrypt.compareSync(data.password, user.password)) {
      return { token: createToken(user) };
    } else {
      throw new Error("Senha incorreta");
    }
  },
};
