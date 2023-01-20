
const path = require("path");

const productCreateHeadData = {title: "Crear Producto", stylesheet: "/css/productCreate.css"};
const productEditHeadData = {title: "Modificar Producto", stylesheet: "/css/productEdit.css"};

const adminController = {
productCreate: (req, res) => res.render("./admin/productCreate", productCreateHeadData),
productEdit: (req, res) => res.render("./admin/productEdit", productEditHeadData)
}


module.exports = adminController;