const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/clone_twitter", {
  userNewUrlParser: true,
});

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const { HTTP_PORT } = process.env;

app.listen(HTTP_PORT, () => {
  console.log(`Estou conectado na porta ${HTTP_PORT}`);
});
