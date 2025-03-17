const Model = require("../Model/PartyModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Key = process.env.KEY;

// create admin user
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
      pass: hashedPassword,
      ogpass:data.pass,
      status: data.status,
      sessionyear:data.sessionyear,
      auth: data.auth,
      schoolid: data.schoolid,
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
    const passwordMatch = await bcrypt.compare(pass, user.pass);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Please Check Password" });
    }
    if(user.status === false){
      return res.status(403).json({ error: "Access Denied Please Contact Admin" });
    }

    const token = jwt.sign({ email: user.email }, Key, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      schoolid: user.schoolid,
      email: user.email,
      partyToken: token,
      status:user.status,
      sessionyear:user.sessionyear,
      expired: user.expired,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed Refresh and try agian !!" });
  }
};

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

// Forget Password - Generate Token
exports.forgetPassword = async (req, res) => {
  const data = Model(req.body);
  const { newpass } = req.body;
  const user = await Model.findOne({ email: data.email });
  try {
    if (newpass) {
      const datas = req.body;

      const newHashPassword = await bcrypt.hash(newpass, 10);
      const data = await Model.findByIdAndUpdate(user._id, {
        email: datas.email,
        ogpass:newpass,
        pass: newHashPassword,
        status: datas.status,
      });

      return res.status(200).json({ message: "Update Detailss", data: data });
    } else {
      const newd = await Model.findByIdAndUpdate(user._id, {
        sessionyear:data.sessionyear,
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
