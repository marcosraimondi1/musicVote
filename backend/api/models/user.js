const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: [true] },
  email: { type: String, required: [true], unique: true },
  access_token: { type: String, required: [true] },
  refresh_token: { type: String, required: [true] },
  roomId: { type: String, required: [false] }
});

// Validator
userSchema.plugin(uniqueValidator, {
  message: "Error, email already exists."
});

// convert to model
const User = mongoose.model("User", userSchema);

module.exports = { User };
