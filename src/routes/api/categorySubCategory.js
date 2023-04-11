const express = require('express');
const router = express.Router();
const path = require("path");
const categorySubCategoryAPIController = require(path.resolve(__dirname, "../../controllers/api/categorySubCategoryAPIController"));

router.get('/categories', categorySubCategoryAPIController.getAllCategories);

router.get('/subcategories', categorySubCategoryAPIController.getAllSubCategories);

module.exports = router;