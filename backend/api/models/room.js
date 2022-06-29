const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  created: { type: Number, required: [true] },
  user_session_id: { type: String, required: [true] },
  code: { type: String, required: [true], unique: true },
  tokens: { type: Object, required: [true] },
  options: { type: Array, default: [] }
});

// Validator
roomSchema.plugin(uniqueValidator, {
  message: "Error, room already exists."
});

// convert to model
const Room = mongoose.model("Room", roomSchema);

module.exports = { Room };
