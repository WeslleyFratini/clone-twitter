const mongoose = require("mongoose");

module.exports = (uri) =>
  mongoose.connect("mongodb://localhost:27017/clone_twitter", {
    userNewUrlParser: true,
  });
