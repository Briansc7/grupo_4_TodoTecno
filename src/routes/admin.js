const express = require("express");
const adminRouter =  express.Router();
const adminController = require("../controllers/adminController");

usersRouter.get("/productCreate",adminController.productCreate);
usersRouter.get("/productEdit",adminController.productEdit);

module.exports = adminRouter;