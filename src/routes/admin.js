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
adminRouter.get('/users', adminAccessValidation, adminController.usersList); 

adminRouter.get('/users/add', adminAccessValidation, adminController.usersAdd); 
adminRouter.post('/users/create', adminAccessValidation, adminController.usersCreate); 

adminRouter.get("/users/edit/:id", adminAccessValidation, adminController.usersEdit);
adminRouter.put("/users/update/:id", adminAccessValidation, adminController.usersUpdate);

adminRouter.delete('/users/delete/:id', adminAccessValidation, adminController.usersDestroy); 



module.exports = adminRouter;