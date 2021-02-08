const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  screen_name: String,
  bio: String,
});

module.exports = mongoose.model("UserModel", UserSchema);
