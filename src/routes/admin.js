const express = require("express");
const adminRouter =  express.Router();
const adminController = require("../controllers/adminController");

const multer = require("multer");
const multerUtils = require("../utils/multerUtils");

const path = require("path");
const adminAccessValidation = require("../middlewares/adminAccessValidation");

const fieldsValidator = require("../middlewares/fieldsValidator");
const productFormatValidation = fieldsValidator.productFormatValidation;
const userFormatValidation = fieldsValidator.userFormatValidation;
const userEditFormatValidation = fieldsValidator.userEditFormatValidation;


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/images/products"),
    filename: function(req, file, cb){
cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    } 
});



let upload = multer(
    { 
        storage: storage,
        fileFilter: function(_req, file, cb){ //opcion para impedir que se suban archivos que no cumplan con el filtrado
            multerUtils.validImageType(file, cb);
        } 
    }
);

let storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/images/users"),
    filename: function(req, file, cb){
cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    } 
});

let uploadAvatar = multer(
    { 
        storage: storageAvatar,

        fileFilter: function(req, file, cb){ //opcion para impedir que se suban archivos que no cumplan con el filtrado
            multerUtils.validImageType(req, file, cb);
        } 
    }
);



//Rutas para CRUD de productos 
adminRouter.get("/productCreate", adminAccessValidation, adminController.productCreate);
adminRouter.post('/productCreate', adminAccessValidation, upload.array("images"), productFormatValidation, adminController.productStore); 

adminRouter.get("/productEdit/:id", adminAccessValidation, adminController.productEdit);
adminRouter.put("/productEdit/:id", adminAccessValidation, productFormatValidation, adminController.productUpdate);

adminRouter.delete('/productDelete/:id', adminAccessValidation, adminController.productDestroy); 

//Rutas para CRUD de usuarios
adminRouter.get('/users', adminAccessValidation, adminController.usersList); 

adminRouter.get('/users/add', adminAccessValidation, adminController.usersAdd); 
adminRouter.post('/users/create', adminAccessValidation, uploadAvatar.single("avatar"), userFormatValidation, adminController.usersCreate); 

adminRouter.get('/users/detail/:id', adminAccessValidation, adminController.usersDetail); 

adminRouter.get("/users/edit/:id", adminAccessValidation, adminController.usersEdit);
adminRouter.put("/users/update/:id", adminAccessValidation, userEditFormatValidation, adminController.usersUpdate);

adminRouter.delete('/users/delete/:id', adminAccessValidation, adminController.usersDestroy); 



module.exports = adminRouter;