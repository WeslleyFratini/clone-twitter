const PostsModel = require("../models/Post");
const UserModel = require("../models/User");

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      const { user } = body;
      if (!body.content) {
        throw new Error("O content não existe");
      }

      const postInstance = new PostModel(body);

      const response = await postInstance.save();

      const postedByUser = await UserModel.findOneAndUpdate(
        { user },
        { $push: { posts: response._id } }
      );

      res.send({ ...response, user: postedByUser });
    } catch (error) {
      res.status(500).send({ error: true });
    }
  },
};
