const express = require('express');
const router = express.Router();
const path = require("path");
const productsAPIController = require(path.resolve(__dirname, "../../controllers/api/productsAPIController"));

router.get('/', productsAPIController.productsList);

router.get('/:id', productsAPIController.productDetail);

module.exports = router;