const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  pass: { type: String },
  ogpass: { type: String },
  schoolid: { type: String, required: true },
  sessionyear: { type: String, required: true },
  status: { type: Boolean, default: false },
  auth: { type: Boolean, default: false },
  expired: { type: Date },
});

const party = mongoose.model("partylogin", partySchema);

module.exports = party;
