const express = require("express");
const controller = require("../Controller/PhotoNumberController");
const Router = express.Router();

Router.get("/:school", controller.FindBySchoolAll);
// teacher side with true 
Router.post("/", controller.Create);
Router.put("/", controller.Update);
// Router.delete("/:id/:school", controller.Delete);

module.exports = Router;
