const express = require("express");
const mongoConnector = require("./mongoose-connector");
const postsController = require("./src/controllers/posts.controller");
const userController = require("./src/controllers/user.controler");
const HandleHttpError = require("./src/middlewares/handle-http-error");
require("dotenv").config();

const app = express();

const { HTTP_PORT, MONGO_URI } = process.env;

mongoConnector(MONGO_URI);

app.use(express.json());
app.user(HandleHttpError);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/posts", postsController);
app.post("/users", userController);

app.listen(HTTP_PORT, () => {
  console.log(`Estou conectado na porta ${HTTP_PORT}`);
});
