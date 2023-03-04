const express = require("express");
const usersRouter =  express.Router();
const usersController = require("../controllers/usersController");
const loginFormatValidation = require("../middlewares/loginFormatValidation");
const registerFormatValidation = require("../middlewares/registerFormatValidation");
const registeredUserAccessValidation = require("../middlewares/registeredUserAccessValidation");

usersRouter.get("/login",usersController.login);
usersRouter.get("/register",usersController.register);
usersRouter.get("/profile", registeredUserAccessValidation, usersController.profile);

usersRouter.post("/", registerFormatValidation, usersController.createUser);
usersRouter.post("/login", loginFormatValidation, usersController.loginSubmit);

module.exports = usersRouter;