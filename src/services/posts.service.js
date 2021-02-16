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
  like(idPost, idUser) {
    return PostsModel.findByIdAndUpdate(idPost, { $push: { likes: idUser } });
  },
  async reply(id, data) {
    const postReply = await PostsModel.create(data);

    const { _id } = postReply;
    return await PostsModel.findByIdAndUpdate(idPost, {
      $push: { replies: _id },
    });
  },
  getReplies(id) {
    return PostsModel.findById(id).populate("replies").select("replies");
  },
};
