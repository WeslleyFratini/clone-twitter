const express = require("express");
const mongoConnector = require("./mongoose-connector");
const {
  create: createPost,
  like,
} = require("./src/controllers/posts.controller");
const {
  create: creatUser,
  profile,
} = require("./src/controllers/user.controler");
const HandleHttpError = require("./src/middlewares/handle-http-error");
const AuthMiddleware = require("./src/middlewares/auth-middleware");
require("dotenv").config();

const app = express();

const { HTTP_PORT, MONGO_URI } = process.env;

mongoConnector(MONGO_URI);

app.use(express.json());
app.user(HandleHttpError);
app.user(AuthMiddleware);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/posts", createPost);
app.post("/users", createUser);
app.post("/login", login);
app.get("/profile/:user", () => {});
app.post("/posts/:id/like", () => {});

app.listen(HTTP_PORT, () => {
  console.log(`Estou conectado na porta ${HTTP_PORT}`);
});
