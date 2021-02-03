const mongoose = require("mongoose");

module.exports = mongoose.model("Post", {
  content: String,
  user: String,
  create_date: Date,
  visible: Boolean,
});
