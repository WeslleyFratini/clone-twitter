const mongoose = require("mongoose");

module.exports = mongoose.moodel("Posts", {
  content: String,
  user: String,
  create_date: Date,
  visible: Boolean,
});
