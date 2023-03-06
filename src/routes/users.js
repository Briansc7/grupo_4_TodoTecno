const express = require("express");
const usersRouter =  express.Router();
const usersController = require("../controllers/usersController");
const loginFormatValidation = require("../middlewares/loginFormatValidation");
const registerFormatValidation = require("../middlewares/registerFormatValidation");
const registeredUsersOnlyAccessValidation = require("../middlewares/registeredUsersOnlyAccessValidation");
const visitorsOnlyAccessValidation = require("../middlewares/visitorsOnlyAccessValidation");

usersRouter.get("/login", visitorsOnlyAccessValidation, usersController.login);
usersRouter.get("/register", visitorsOnlyAccessValidation, usersController.register);
usersRouter.get("/profile", registeredUsersOnlyAccessValidation, usersController.profile);

usersRouter.post("/", registerFormatValidation, usersController.createUser);
usersRouter.post("/login", loginFormatValidation, usersController.loginSubmit);

usersRouter.post("/logout", usersController.logout);

module.exports = usersRouter;