const express = require("express");
const adminRouter =  express.Router();
const adminController = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/images/products"),
    filename: function(req, file, cb){
cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    } 
});

let upload = multer({ storage: storage });

 
adminRouter.get("/productCreate",adminController.productCreate);
adminRouter.post('/productCreate', upload.array("images"), adminController.productStore); 

adminRouter.get("/productEdit/:id",adminController.productEdit);
adminRouter.put("/productEdit/:id",adminController.productUpdate);

adminRouter.delete('/productDelete/:id', adminController.productDestroy); 



module.exports = adminRouter;