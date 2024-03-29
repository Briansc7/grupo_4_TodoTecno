const express = require("express");
const path = require("path");
const usersRouter =  express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const multerUtils = require("../utils/multerUtils");

const fieldsValidator = require("../middlewares/fieldsValidator");
const loginFormatValidation = fieldsValidator.loginFormatValidation;
const registerFormatValidation = fieldsValidator.registerFormatValidation;
const userFormatValidation = fieldsValidator.userFormatValidation;

const registeredUsersOnlyAccessValidation = require("../middlewares/registeredUsersOnlyAccessValidation");
const visitorsOnlyAccessValidation = require("../middlewares/visitorsOnlyAccessValidation");
const adminOptionsVisibilityAccessValidation = require("../middlewares/adminOptionsVisibilityAccessValidation");

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
    });

usersRouter.get("/login", visitorsOnlyAccessValidation, usersController.login);
usersRouter.get("/register", visitorsOnlyAccessValidation, usersController.register);
usersRouter.get("/profile",  adminOptionsVisibilityAccessValidation, registeredUsersOnlyAccessValidation, usersController.profile);
usersRouter.get("/edit-profile", registeredUsersOnlyAccessValidation, usersController.editProfile);

usersRouter.put("/update-profile", registeredUsersOnlyAccessValidation, userFormatValidation, usersController.updateProfile);

usersRouter.post("/", uploadAvatar.single("avatar"), registerFormatValidation, usersController.createUser);
usersRouter.post("/login", loginFormatValidation, usersController.loginSubmit);

usersRouter.post("/logout", usersController.logout);

module.exports = usersRouter;