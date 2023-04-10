const path = require("path");
const database = require(path.resolve(__dirname, "../legacyDatabase/jsonDatabase"));

const productDetailHeadData = {title: "Detalle del Producto", stylesheet: "/css/productDetail.css"};
const productCartHeadData = {title: "Carrito de Compras", stylesheet: "/css/productCart.css"};
const productsListHeadData = {title: "Productos", stylesheet: "/css/productsList.css"};

const productsController = {
productDetail: async (req, res) => res.render("./products/productDetail",
    {head: productDetailHeadData, product: await database.productDetailGetById(req.params.id), recommendations: await database.getProductsFromRecommendationsByID(req.params.id)
}),

productCart: (req, res) => res.render("./products/productCart", {head: productCartHeadData}),

productsList: async (req, res) => res.render("./products/productsList", {head: productsListHeadData, products: await database.getAllProducts()})
}


module.exports = productsController;