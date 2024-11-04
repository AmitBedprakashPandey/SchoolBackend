const mongoose = require("mongoose");

const TLoginSchema = new mongoose.Schema({
  schoolid :{type : String,unique: true, required: true},
  prefix : {type : String,unique: true, required: true},
  number:{type : String,unique: true, required: true},
});

const TLogin = mongoose.model("photonumber", TLoginSchema);

module.exports = TLogin;
``;
