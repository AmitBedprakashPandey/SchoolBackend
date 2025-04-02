// customerModel.js

const mongoose = require("mongoose");

const Attendence = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User or Employee/Student model
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      checkInTime: {
        type: Date,
      },
      checkOutTime: {
        type: Date,
      },
      duration: {
        type: Number, // Duration in minutes or seconds
        default: 0,
      },
      status: {
        type: String,
        enum: ["Present", "Absent", "Leave", "Half-Day", "Late"],
        default: "Absent",
      },
      location: {
        type: {
          latitude: { type: Number },
          longitude: { type: Number },
        },
      },
      remarks: {
        type: String,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });
   const Att = mongoose.model("leave", Attendence);

module.exports = Att;
