const Leave = require("../Model/LeaveModel");

// Mark attendance
exports.markAttendance = async (req,res) => {
  try {
     const AttData = new Leave(req.body);
     const saveData = await AttData.create();
     console.log("Leave marked successfully");
     return res
     .status(200)
     .json({ message: "Create successfully", data: saveData })
     .end();
  } catch (error) {
    console.error("markAttendance", error);
    res.status(500).json({ message: error });
  }
};

exports.updateAttendance = async (req,res) => {
    try {
        const { id } = req.params;
        const data = new Leave(req.body);
        const foundData =  await Leave.find({_id : id});
        
        if(!foundData) {
            return res.status(404).json({error:"Attandence Not Found"});
        }

       const saveData = await Leave.findByIdAndUpdate({_id:id},data);
       console.log("Leave updated successfully");
       return res
       .status(200)
       .json({ message: "Update successfully", data: saveData })
       .end();
    } catch (error) {
      console.error("markAttendance", error);
      res.status(500).json({ message: error });
    }
  };