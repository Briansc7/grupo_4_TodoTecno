const express = require("express");
const adminRouter =  express.Router();
const adminController = require("../controllers/adminController");
 
adminRouter.get("/productCreate",adminController.productCreate);
adminRouter.get("/productEdit",adminController.productEdit);

module.exports = adminRouter;