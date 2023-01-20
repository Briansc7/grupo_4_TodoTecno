const path = require("path");
const database = require(path.resolve(__dirname, "../database/jsonDatabase"));
const productsData = database.producsData;

const productDetailHeadData = {title: "Detalle del Producto", stylesheet: "/css/productDetail.css"};
const productCartHeadData = {title: "Carrito de Compras", stylesheet: "/css/productCart.css"};

const productsController = {
productDetail: (req, res) => res.render("./products/productDetail",Object.assign({},productDetailHeadData,
    productsData.find(product=>product.id==req.params.id)
    )),
productCart: (req, res) => res.render("./products/productCart", productCartHeadData)
}


module.exports = productsController;