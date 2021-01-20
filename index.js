const express = require("express");
const mongoConnector = require("./mongoose-connector");
require("dotenv").config();
const postsController = require("./src/controller/postsController");

const app = express();

mongoConnector(MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/posts", postController);

const { HTTP_PORT, MONGO_URI } = process.env;

app.listen(HTTP_PORT, () => {
  console.log(`Estou conectado na porta ${HTTP_PORT}`);
});
