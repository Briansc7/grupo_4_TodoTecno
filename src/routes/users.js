const express = require("express");
const usersRouter =  express.Router();
const usersController = require("../controllers/usersController");
const loginFormatValidation = require("../middlewares/loginFormatValidation");

usersRouter.get("/login",usersController.login);
usersRouter.get("/register",usersController.register);

usersRouter.post("/", usersController.createUser);
usersRouter.post("/login", loginFormatValidation, usersController.loginSubmit);

module.exports = usersRouter;