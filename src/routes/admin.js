const express = require("express");
const adminRouter =  express.Router();
const adminController = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");
const adminAccessValidation = require("../middlewares/adminAccessValidation");


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/images/products"),
    filename: function(req, file, cb){
cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    } 
});

let upload = multer({ storage: storage });

//Rutas para CRUD de productos 
adminRouter.get("/productCreate", adminAccessValidation, adminController.productCreate);
adminRouter.post('/productCreate', adminAccessValidation, upload.array("images"), adminController.productStore); 

adminRouter.get("/productEdit/:id", adminAccessValidation, adminController.productEdit);
adminRouter.put("/productEdit/:id", adminAccessValidation, adminController.productUpdate);

adminRouter.delete('/productDelete/:id', adminAccessValidation, adminController.productDestroy); 

//Rutas para CRUD de usuarios
adminRouter.get('/userCreate', adminAccessValidation, adminController.userCreate); 
adminRouter.post('/userCreate', adminAccessValidation, adminController.userStore); 

adminRouter.get("/userEdit/:id", adminAccessValidation, adminController.userEdit);
adminRouter.put("/userEdit/:id", adminAccessValidation, adminController.userUpdate);

adminRouter.delete('/userDelete/:id', adminAccessValidation, adminController.userDestroy); 



module.exports = adminRouter;