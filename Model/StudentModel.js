const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  admission_id: { type: String },
  photonumber:{type:String},
  rollno: { type: Number },
  remark: { type: String },
  transport: { type: String },
  name: { type: String },
  father_name: { type: String },
  fatherimage: { type: String },
  mothername: { type: String },
  motherimage: { type: String },
  class: { type: String },
  mobile: { type: Number },
  address: { type: String },
  image: { type: String },
  dob: { type: String },
  schoolid: { type: String },
  status: { type: Boolean, default: true },
  section: { type: String },
  guardianname: { type: String },
  guardianimage: { type: String },
  print: { type: Boolean ,default : false},
});

const student = mongoose.model("student", StudentSchema);

module.exports = student;
