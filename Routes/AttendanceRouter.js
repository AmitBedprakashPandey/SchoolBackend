const express = require("express");
const Controller = require("../Controller/AttandenceController");
const Router = express.Router();

Router.post("/", Controller.saveAttendance);
Router.get("/:employeeId/:month/:year", Controller.getAttendance);

module.exports = Router;
