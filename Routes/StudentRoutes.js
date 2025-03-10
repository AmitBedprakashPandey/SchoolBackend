const express = require("express");
const controller = require("../Controller/StudentController");
const Router = express.Router();

Router.get("/:school", controller.getStudentBySchool);
Router.get("/:classs/:section/:school",controller.getStudentByClassSectionSchool);
Router.post("/", controller.Create);
Router.post("/many", controller.InsertMany);
Router.post("/manyupdate", controller.UpdateMany);
Router.put("/updateprintstatus", controller.UpdatePrintStatusMany);
Router.put("/", controller.Update);
Router.put("/session", controller.SessionUpdate);
Router.post("/:id/:school", controller.Delete);

module.exports = Router;
