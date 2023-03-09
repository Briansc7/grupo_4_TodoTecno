const express = require("express");
const productsRouter =  express.Router();
const productsController = require("../controllers/productsController");
const adminOptionsVisibilityAccessValidation = require("../middlewares/adminOptionsVisibilityAccessValidation");

productsRouter.get("/productDetail/:id", adminOptionsVisibilityAccessValidation, productsController.productDetail);
productsRouter.get("/productCart",productsController.productCart);
productsRouter.get("/",productsController.productsList);

module.exports = productsRouter;