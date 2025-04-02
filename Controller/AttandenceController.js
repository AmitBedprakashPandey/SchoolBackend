const Model = require("../Model/AttandenceModel");

exports.getAttendance = async (req, res) => {
  try {
    const { employeeId, month, year } = req.params;
    const regex = new RegExp(`^${year}-${month.padStart(2, "0")}-\\d{2}$`);

    try {
      const attendanceRecords = await Attendance.find({
        employeeId,
        date: regex,
      });
      res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ error: "Failed to fetch attendance" });
    }
  } catch (error) {
    console.log("getAttendance", error);
  }
};

exports.saveAttendance = async (req, res) => {
  const { employeeId, date, status } = req.body;

  // Generate current timestamp
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

  try {
    const existingRecord = await Attendance.findOne({ employeeId, date });

    if (existingRecord) {
      // Update existing attendance
      existingRecord.status = status;
      existingRecord.timestamp = timestamp;
      await existingRecord.save();
      res.status(200).json({ message: "Attendance updated successfully!" });
    } else {
      // Add new attendance record
      const newAttendance = new Attendance({
        employeeId,
        date,
        status,
        timestamp,
      });
      await newAttendance.save();
      res.status(201).json({ message: "Attendance recorded successfully!" });
    }
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ error: "Failed to save attendance" });
  }
};
