const Model = require("../Model/StudentModel");

exports.getStudentBySchool = async (req, res) => {
  try {
    const { school } = req.params;
    const data = Model.find({ schoolid: school });
    res.status(200).end(data);
  } catch (error) {
    console.error("getStudentBySchoolId", error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !!!" });
  }
};

// get student by class section school for teacher portal
exports.getStudentByClassSectionSchool = async (req, res) => {
  try {
    const { classs, section, school } = req.params;
    const find = await Model.find({
      class: classs,
      section: section,
      schoolid: school,
      status: "true",
    });
    return res.status(200).json({ find }).end();
  } catch (error) {
    console.error("getStudentByClassSectionSchool", error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !" });
  }
};

// create students for admin
exports.Create = async (req, res) => {
  try {
    const find = await Model.create(req.body);
    return res
      .status(200)
      .json({ message: "Create successfully", data: find })
      .end();
  } catch (error) {
    console.error("Studnet Create", error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !" });
  }
};

// create many students via excel for admin / teacher
exports.InsertMany = async (req, res) => {
  const datas = [];
  try {
    const dataArray = req.body; // Assuming req.body contains an array of documents
    for (let index = 0; index < dataArray.length; index++) {
      await Model.create(dataArray[index].data);
      datas.push(dataArray[index].data);
    }

    // const find = await Model.insertMany(datas);
    return res
      .status(200)
      .json({ message: "Insert many successfully", data: datas })
      .end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again!" });
  }
};

exports.UpdateMany = async (req, res) => {
  const datas = [];
  try {
    const dataArray = req.body; // Assuming req.body contains an array of documents
    for (let index = 0; index < dataArray.length; index++) {
      await Model.findOneAndUpdate(
        { _id: dataArray[index]._id },
        dataArray[index]
      );
      datas.push(dataArray[index]);
    }

    const find = await Model.insertMany(datas);
    return res
      .status(200)
      .json({ message: "Insert many successfully", data: datas });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again!" });
  }
};

exports.UpdatePrintStatusMany = async (req, res) => {
  const datas = [];
  try {
    const dataArray = req.body; // Assuming req.body contains an array of documents
    for (let index = 0; index < dataArray.length; index++) {
      await Model.findOneAndUpdate(
        { _id: dataArray[index]._id },
        { print: true }
      );
      datas.push(dataArray[index]);
    }
    // const find = await Model.insertMany(datas);
    return res.status(200).json({ message: "Print Successfully", data: datas });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again!" });
  }
};

// update students for admin
exports.Update = async (req, res) => {
  const data = Model(req.body);
  try {
    const find = await Model.findOneAndUpdate(
      { _id: data._id, schoolid: data.schoolid },
      data,
      { new: true }
    );
    return res.status(200).json({ message: "Update successfully", data: find });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !" });
  }
};

// no use for now
exports.Delete = async (req, res) => {
  const { id, school } = req.params;
  const data = Model(req.body);
  try {
    const find = await Model.findOneAndDelete(
      { _id: id, schoolid: school },
      data
    );
    return res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !" });
  }
};
