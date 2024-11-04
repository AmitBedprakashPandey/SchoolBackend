const express = require("express");
const controller = require("../Controller/AdmitCardTemplateController");
const Router = express.Router();

Router.get("/:school", controller.FindBySchoolAll);

Router.post("/", controller.Create);
Router.put("/", controller.Update);
Router.delete("/:id/:school", controller.Delete);

module.exports = Router;
