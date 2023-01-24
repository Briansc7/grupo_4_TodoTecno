const express = require("express");
const adminRouter =  express.Router();
const adminController = require("../controllers/adminController");
 
adminRouter.get("/productCreate",adminController.productCreate);
adminRouter.post('/productCreate', adminController.productStore); 

adminRouter.get("/productEdit/:id",adminController.productEdit);
adminRouter.put("/productEdit/:id",adminController.productUpdate);

adminRouter.delete('/productDelete/:id', adminController.productDestroy); 



module.exports = adminRouter;