const express = require("express");
const mainRouter =  express.Router();
const mainController = require("../controllers/mainController");

mainRouter.get("/",mainController.home);
mainRouter.get("/search", mainController.search); 

module.exports = mainRouter;