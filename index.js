const express = require("express");
const mongoConnector = require("./mongoose-connector");
require("dotenv").config();
const postsController = require("./src/controllers/posts.controller");

const app = express();

mongoConnector(MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/posts", postsController);

const { HTTP_PORT, MONGO_URI } = process.env;

app.listen(HTTP_PORT, () => {
  console.log(`Estou conectado na porta ${HTTP_PORT}`);
});
