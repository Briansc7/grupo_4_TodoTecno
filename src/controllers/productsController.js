const path = require("path");

const productDetailHeadData = {title: "Detalle del Producto", stylesheet: "/css/productDetail.css"};
const productCartHeadData = {title: "Carrito de Compras", stylesheet: "/css/productCart.css"};

const productsController = {
productDetail: (req, res) => res.render("./products/productDetail",productDetailHeadData),
productCart: (req, res) => res.render("./products/productCart", productCartHeadData)
}


module.exports = productsController;