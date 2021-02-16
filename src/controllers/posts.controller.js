const PostsService = require("../services/posts.service");

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      const { user } = body;

      const response = await PostsService.create(body, user);

      res.send(response);
    } catch (error) {
      res.status(500).send({ error: true });
    }
  },
  async like(req, res) {
    try {
      const { id } = req.params;
      const { id: idUser } = req.decoded;
      const response = await PostsService.like(id, idUser);

      res.send(response);
    } catch (e) {
      res.send({ error: true, message: e.message });
    }
  },
  async reply(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const response = await PostsServie.reply(id, body);
      res.send(response);
    } catch (e) {
      res.send({ error: true, message: e.message });
    }
  },
  async getReplies() {
    try {
      const { id } = req.params;
      const { body } = req;

      const response = await PostsServie.getReplies(id, body);
      res.send(response);
    } catch (error) {
      res.send({ error: true, message: e.message });
    }
  },
  async getFeed(req, res) {
    try {
      const { id: idUser } = req.decoded;
      const response = await PostsServie.getFeed(idUser);

      res.send(response);
    } catch (error) {
      res.send({ error: true, message: e.message });
    }
  },
};
