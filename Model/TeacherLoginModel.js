// customerModel.js

const mongoose = require("mongoose");

const TLoginSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  pass: { type: String, required: true },
  ogpass: { type: String, required: true },
  status: { type: Boolean },
  user: { type: String, required: true },
  auth: { type: Boolean },
  sessionyear:{type:String},
  expired: { type: Date },
});

const TLogin = mongoose.model("tlogin", TLoginSchema);

module.exports = TLogin;
