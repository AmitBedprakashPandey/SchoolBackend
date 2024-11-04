const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  temp: { type: String },
  tempimage: { type: String },
  temp2: { type: String },
  tempimage2: { type: String },
  schoolid: { type: String },
  status: { type: Boolean, default: false },
  status2: { type: Boolean, default: false },
});

const teacher = mongoose.model("admitcardtemplate", TemplateSchema);

module.exports = teacher;
