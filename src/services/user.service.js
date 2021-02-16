const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

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
  async create(data) {
    const { password } = data;
    const encryptedPassword = bcrypt.hashSync(password, 2);

    return await UserModel.create({ ...data, password: encryptedPassword });
  },
  async profile(user) {
    return await UserModel.aggregate([
      { $match: { user } },
      {
        $lookup: {
          from: "posts",
          localFields: "posts",
          foreignFields: "_id",
          as: "posts",
        },
      },
      { $unwind: "posts" },
      {
        $project: {
          posts: 1,
          name: 1,
          bio: 1,
          profile_pic: 1,
          post: "$posts",
          likes: { $size: "$posts.likes" },
        },
      },
      { $project: { posts: 0 } },
    ]);
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

  async follow(id, idUser) {
    await UserModel.findByIdAndUpdate(id, {
      $push: { followers: idUser },
    });
    return await UserModel.findByIdAndUpdate(idUser, {
      $push: { following: id },
    });
  },
};
