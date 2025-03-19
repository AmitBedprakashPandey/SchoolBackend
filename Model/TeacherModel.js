const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  schoolid: { type: String, require: true },
  name: { type: String,  required: true },
  lastnm: { type: String, required: true },
  mobile: { type: Number, require: true },
  address: { type: String, require: true },
  classs: { type: String, require: true },
  sessionyear:{type:String,require:true},
  section: { type: String, require: true },
  status: { type: Boolean },
  auth: { type: Boolean },
});

const Teacher = mongoose.model("teacher", TeacherSchema);

module.exports = Teacher;
  