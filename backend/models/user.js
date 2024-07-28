const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  phone_number: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
