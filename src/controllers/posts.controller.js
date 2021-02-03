const PostsModel = require("../models/Post");

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      if (!body.content) {
        throw new Error("O content não existe");
      }

      const postInstance = new PostModel(body);

      const response = await postInstance.save();

      res.send(response);
    } catch (error) {
      res.status(500).send({ error: true });
    }
  },
};
