const express = require('express');
const router = express.Router();
const path = require("path");
const usersAPIController = require(path.resolve(__dirname, "../../controllers/api/usersAPIController"));

router.get('/', usersAPIController.usersList);

router.get('/:id', usersAPIController.userDetail);

module.exports = router;