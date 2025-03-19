const Model = require("../Model/TeacherLoginModel");
const TeacherModel = require("../Model/TeacherModel");
const SchoolModel = require("../Model/SchoolModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Key = process.env.KEY;

// create teacher login
exports.register = async (req, res) => {
  try {
    const data = Model(req.body);
    const foundUser = await Model.findOne({ email: data.email });
    if (foundUser) {
      return res.status(302).json({ info: "aleady have user" });
    }
    const hashedPassword = await bcrypt.hash(data.pass, 10);
    const user = new Model({
      email: data.email,
      ogpass: data.pass,
      pass: hashedPassword,
      status: data.status,
      sessionyear: data.sessionyear,
      auth: data.auth,
      user: data.user,
    });
    const inserted = await Model.create(user);
    return res.status(200).json({ message: "Register Successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error, Refresh and try again !" });
  }
};
// teacher Login
exports.login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await Model.findOne({ email });

    if (user.status === false) {
      return res.status(401).json({ error: "Access Denied" });
    }
    if (!user) {
      return res.status(404).json({ error: "User Not found !" });
    }
    const passwordMatch = await bcrypt.compare(pass, user.pass);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Please Check Password" });
    }

    const token = jwt.sign({ userId: user.email }, Key, {
      expiresIn: "1d",
    });

    
    const findTeacher = await TeacherModel.findOne({ user: user });
    const findSchool = await SchoolModel.findOne({
      _id: findTeacher?.schoolid,
    });
  
    return res.status(200).json({
      Schoolid: findTeacher?.schoolid,
      name: findTeacher?.name,
      lastname: findTeacher?.lastnm,
      class: findTeacher?.classs,
      section: findTeacher?.section,
      sessionyear: user.sessionyear,
      school: findSchool?.name, 
      token: token,
      email: user.email,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Login failed Refresh and try agian !!" });
  }
};
// find logger by teacher id
exports.findloger = async (req, res) => {
  const { teacher } = req.params;
  try {
    const user = await Model.findOne({ user: teacher });

    if (!user) {
      return user.status(404);
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: "Login failed Refresh and try agian !!" });
  }
};
// change password  email
exports.forgetPassword = async (req, res) => {
  const getData = Model(req.body);
  const { newpass } = req.body;
  try {
    const user = await Model.findOne({ email: getData.email });
    if (newpass) {
      const newHashPassword = await bcrypt.hash(newpass, 10);
      const updateData = await Model.findByIdAndUpdate(user._id, {
        email: getData.email,
        ogpass: newpass,
        pass: newHashPassword,
        sessionyear: getData.sessionyear,
        status: getData.status,
      });

      return res
        .status(200)
        .json({ message: "Update Detailss", data: updateData });
    } else {
      const newData = await Model.findByIdAndUpdate(user._id, {
        status: getData.status,
        sessionyear: getData.sessionyear,
      });

      return res.status(200).json({ message: "Update Details", data: newData });
    }
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: "Forget Password failed Refresh and try again !!" });
  }
};
