const Model = require("../Model/AdminLoginModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Key = process.env.KEY;

// create admin user
exports.register = async (req, res) => {
  try {
    const data = Model(req.body);
    const foundUser = await Model.findOne({
      email: data.email,
    });
    if (foundUser) {
      return res
        .status(302)
        .json({ message: "Email and user name aleady exist!" });
    }
    const hashedPassword = await bcrypt.hash(data.pass, 10);
    const user = new Model({
      name: data.name,
      lastnm: data.lastnm,
      email: data.email,
      ogpass: data.pass,
      pass: hashedPassword,
      status: data.status,
      auth: true,
      schoolid: data.schoolid,
      expired: data.expired,
      // startexpired: startexpired,
    });
    await Model.create(user);
    return res.status(200).json({ message: "Register Successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error, Refresh and try again !" });
  }
};

// Admin Login
exports.login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User Not found !" });
    }
    if (user.status === false) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const passwordMatch = await bcrypt.compare(pass, user.pass);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Please Check Password" });
    }

    const token = jwt.sign({ email: user.email }, Key, {
      expiresIn: "1d",
    });
    res.status(200).json({
      schoolid: user.schoolid,
      email: user.email,
      adminToken: token,
      expired: user.expired,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed Refresh and try agian !!" });
  }
};

// find admin
exports.findloger = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Model.findOne({ schoolid: id });

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
  const data = Model(req.body);
  const user = await Model.findOne({ email: data.email });
  const { newpass } = req.body;
  try {
    if (newpass) {
      const newHashPassword = await bcrypt.hash(newpass, 10);
      const newData = await Model.findByIdAndUpdate(user._id, {
        email: data.email,
        ogpass: newpass,
        pass: newHashPassword,
        status: data.status,
        expired: data.expired,
        // startexpired: data.startexpired,
      });

      return res.status(200).json({ message: "Update Detail", data: newData });
    }
    if (!newpass) {
      const newd = await Model.findByIdAndUpdate(user._id, {
        status: data.status,
        expired: data.expired,
        startexpired: data.startexpired,
      });

      return res.status(200).json({ message: "Update Details", data: newd });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Forget Password failed Refresh and try again !!" });
  }
};
