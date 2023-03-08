const express = require("express");
const path = require("path");
const usersRouter =  express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const loginFormatValidation = require("../middlewares/loginFormatValidation");
const registerFormatValidation = require("../middlewares/registerFormatValidation");
const registeredUsersOnlyAccessValidation = require("../middlewares/registeredUsersOnlyAccessValidation");
const visitorsOnlyAccessValidation = require("../middlewares/visitorsOnlyAccessValidation");

let storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/images/users"),
    filename: function(req, file, cb){
cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    } 
});

let uploadAvatar = multer({ storage: storageAvatar });

usersRouter.get("/login", visitorsOnlyAccessValidation, usersController.login);
usersRouter.get("/register", visitorsOnlyAccessValidation, usersController.register);
usersRouter.get("/profile", registeredUsersOnlyAccessValidation, usersController.profile);

usersRouter.post("/", uploadAvatar.array("avatarFiles"), registerFormatValidation, usersController.createUser);
usersRouter.post("/login", loginFormatValidation, usersController.loginSubmit);

usersRouter.post("/logout", usersController.logout);

module.exports = usersRouter;