const path = require("path");
const database = require(path.resolve(__dirname, "../database/jsonDatabase"));

const productDetailHeadData = {title: "Detalle del Producto", stylesheet: "/css/productDetail.css"};
const productCartHeadData = {title: "Carrito de Compras", stylesheet: "/css/productCart.css"};

const productsController = {
productDetail: (req, res) => res.render("./products/productDetail",Object.assign({},productDetailHeadData,
    database.getProductById(req.params.id)
    )),
productCart: (req, res) => res.render("./products/productCart", productCartHeadData)
}


module.exports = productsController;