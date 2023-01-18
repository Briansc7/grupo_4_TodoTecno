const express = require("express");
const productsRouter =  express.Router();

productsRouter.get("/productDetail", (req, res)=> res.render("./products/productDetail"));

productsRouter.get("/productCart", (req, res)=> res.render("./products/productCart"));

module.exports = productsRouter;