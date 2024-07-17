require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Adjust the limit for JSON requests
app.use(bodyParser.json({ limit: "10mb" }));

// Adjust the limit for URL-encoded requests
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json()); 

// app.use(cors({
//   origin: "*", // Adjust this to your specific needs
//   methods: 'GET, POST, PUT, DELETE, OPTIONS',
//   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// }));

app.use(cors());

const mongoUrl = process.env.DB_URL;
mongoose.set('strictQuery', true);
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log("database Connet Error", e));

const verfyToken = require("./Controller/Middlware/AuthMiddleware");
const AuthRoute = require("./Routes/UserRoutes");
const TLoginAuthRoute = require("./Routes/TeacherLoginRoutes");
const SuperAdminAuthRoute = require("./Routes/SuperAmin");
const AdminAuthRoute = require("./Routes/AdminLoginRoutes");
const teacherRoute = require("./Routes/TeacherRoutes");
const StudentRoute = require("./Routes/StudentRoutes");
const SchoolRoute = require("./Routes/SchoolRoutes");
const ClassRoute = require("./Routes/ClassRoutes");
const TemplateRoute = require("./Routes/TemplateRoute");
const sectionRoute = require("./Routes/SectionRoutes");
const partyRoute = require("./Routes/PartyRoutes");
const ExpiredMiddleware = require("./Routes/ExpiredRoutes");
// Teacher login
app.use("/school/auth", AuthRoute);
// on admin create register login forget password
app.use("/school/teacherauth", TLoginAuthRoute);
// Admin login
app.use("/school/adminauth", AdminAuthRoute);
// third party auth
app.use("/school/partyauth", partyRoute);
app.use("/school/verifyexpire", ExpiredMiddleware);

app.use("/school/superauth", SuperAdminAuthRoute);
app.use("/school/verfytoken", verfyToken);
app.use("/school/teacher", verfyToken, teacherRoute);
app.use("/school/student", StudentRoute);
app.use("/school/school", verfyToken, SchoolRoute);
app.use("/school/class", verfyToken, ClassRoute);
app.use("/school/template", verfyToken, TemplateRoute);
app.use("/school/section", verfyToken, sectionRoute);

app.listen(port, () => {
  console.log(`${port} Server started...`);
});
