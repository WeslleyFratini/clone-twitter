const { ObjectId } = require("mongodb");
const mongooose = require("mongoose");

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const User = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  bio: { type: String, required: true },
  user: { type: String, required: true },
  location: { type: String, required: true },
  posts: [{ type: ObjectId, ref: "Post" }],
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile_pic: { type: String, required: true },
  birth_date: { type: Date, required: true },
});

module.exports = mongoose.model("user", "user");
