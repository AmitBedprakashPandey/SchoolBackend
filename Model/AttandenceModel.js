const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employeeId: { type: Number, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  status: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true, // Save in "YYYY-MM-DD HH:mm:ss" format
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Attendance = mongoose.model("attendance", AttendanceSchema);

module.exports = Attendance;
