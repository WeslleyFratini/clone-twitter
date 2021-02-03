const PostsModel = require("../models/Post");
const UserModel = require("../models/User");

module.exports = {
  async create(data, user) {
    if (!data.content) {
      throw new Error("O content não existe");
    }

    const postInstance = new PostModel(data);

    const response = await postInstance.save();

    const postedByUser = await UserModel.findOneAndUpdate(
      { user },
      { $push: { posts: response._id } }
    );

    return { ...response, user: postedByUser };
  },
};
