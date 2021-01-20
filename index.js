const express = require("express");
const mongoConnector = require("./mongoose-connector");
const postsController = require("./src/controllers/posts.controller");
require("dotenv").config();

const app = express();

const { HTTP_PORT, MONGO_URI } = process.env;

mongoConnector(MONGO_URI);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/posts", postsController);

app.listen(HTTP_PORT, () => {
  console.log(`Estou conectado na porta ${HTTP_PORT}`);
});
