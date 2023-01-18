const express = require("express");
const mainRouter =  express.Router();
const mainController = require("../controllers/mainController");

mainRouter.get("/",mainController.home);

module.exports = mainRouter;