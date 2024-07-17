const Model = require("../Model/SuperAdmin");
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
      email: data.email,
      pass: hashedPassword,
      status: data.status,
      auth: true,
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

// Admin Login
exports.login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User Not found !" });
    }
    const passwordMatch = await bcrypt.compare(pass, user.pass);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Please Check Password" });
    }

    const token = jwt.sign({ email: user.email }, Key, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      email: user.email,
      superToken: token,
      expired: user.expired,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed Refresh and try agian !!" });
  }
};

// Forget Password - Generate Token
exports.forgetPassword = async (req, res) => {
  try {
    const data = Model(req.body);
    const { newpass } = req.body;
    const user = await Model.findOne({ email: data.email });
    if (newpass) {
      const datas = req.body;
      const newHashPassword = await bcrypt.hash(newpass, 10);
      const data = await Model.findByIdAndUpdate(user._id, {
        email: datas.email,
        pass: newHashPassword,
        status: datas.status,
      });

      return res.status(200).json({ message: "Update Detailss", data: data });
    } else {
      const newd = await Model.findByIdAndUpdate(user._id, {
        status: data.status,
      });

      return res.status(200).json({ message: "Update Details", data: newd });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Forget Password failed Refresh and try again !!" });
  }
};

// find logger by teacher id
exports.findloger = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Model.findOne({ _id: id });

    if (!user) {
      return user.status(404);
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: "Login failed Refresh and try agian !!" });
  }
};
