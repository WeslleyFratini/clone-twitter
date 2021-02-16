const express = require("express");
const mongoConnector = require("./mongoose-connector");
const {
  create: createPosts,
  like,
  reply,
  getReplies,
} = require("./src/controllers/posts.controller");
const {
  create: creatUser,
  profile,
  login,
  follow,
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

app.post("/posts", createPosts);
app.post("/users", createUser);
app.post("/login", login);
app.get("/profile/:user", profile);
app.post("/posts/:id/like", like);
app.post("/posts/:id/reply", reply);
app.get("/posts/:id/replies", getReplies);
app.post("/user/:id/follow", follow);

app.listen(HTTP_PORT, () => {
  console.log(`Estou conectado na porta ${HTTP_PORT}`);
});
