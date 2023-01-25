
const path = require("path");
const database = require(path.resolve(__dirname, "../database/jsonDatabase"));

const productCreateHeadData = {title: "Crear Producto", stylesheet: "/css/productCreate.css"};
const productEditHeadData = {title: "Modificar Producto", stylesheet: "/css/productEdit.css"};

const adminController = {

productCreate: (req, res) => res.render("./admin/productCreate", productCreateHeadData),

productStore: (req, res) => res.send("producto creado"),

productEdit: (req, res) => res.render("./admin/productEdit", Object.assign({},productEditHeadData,
    database.getProductById(req.params.id)
    )),

productUpdate: (req, res) => res.send("producto actualizado"),

productDestroy: (req, res) => res.send("producto eliminado"),



}


module.exports = adminController;