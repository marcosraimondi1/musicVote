const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  created: { type: Number, required: [true] },
  userId: { type: String, required: [true] },
  id: { type: String, required: [true], unique: true }
});

// Validator
roomSchema.plugin(uniqueValidator, {
  message: "Error, room already exists."
});

// convert to model
const Room = mongoose.model("Room", roomSchema);

module.exports = { Room };
