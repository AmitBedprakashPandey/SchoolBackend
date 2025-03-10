const Model = require("../Model/PhotoNumberModel");

// get all PhotoNumber by school without true
exports.FindBySchoolAll = async (req, res) => {
  try {

    const find = await Model.findOne({ schoolid: req.params.school });
    return res.status(200).json(find);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !" });
  }
};

// create Photo Number with school
exports.Create = async (req, res) => {
  const data = Model(req.body);
  try {
    const foundData = await Model.findOne({schoolid: data.school});
    if (foundData) {
      return res.status(302).json({ message: "Found Photo Number" });
    }
    const created = await Model.create(data);
    return res.status(200).json(created);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !" });
  }
};

// update Photo Number via school
exports.Update = async (req, res) => {
  const data = Model(req.body);
  
  try {
    const find = await Model.findOneAndUpdate({ _id: data._id, schoolid: data.schoolid },{number:Number(data.number) + Number(1)},{ new: true });
    return res.status(200).json(find);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !" });
  }
};


//  no use for now
exports.Delete = async (req, res) => {
  const { id, school } = req.params;
  try {
    const find = await Model.findOneAndDelete({ _id: id, schoolid: school });
    return res.status(200).json({ message: "Delete successfully", data: find });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error, Refresh and try again !" });
  }
};
