const mongoose = require("mongoose");

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const PostSchema = new Schema({
  content: { type: String, required: true },
  user: { type: String, required: true },
  create_date: { type: Date, required: true },
  visible: { type: Boolean, default: true },
  like: { type: ObjectId, ref: "user" },
});

module.exports = mongoose.model("Post", PostSchema);
