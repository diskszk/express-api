const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthenticatedUserSchema = new Schema({
  name: String,
  password: String,
});

module.exports = mongoose.model("AuthenticatedUserModel", AuthenticatedUserSchema);
