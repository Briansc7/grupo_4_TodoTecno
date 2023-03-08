
const path = require("path");

const database = require(path.resolve(__dirname, "../database/jsonDatabase"));

const productCreateHeadData = {title: "Crear Producto", stylesheet: "/css/productCreate.css"};
const productEditHeadData = {title: "Modificar Producto", stylesheet: "/css/productEdit.css"};

const userCreateHeadData = {title: "Crear Nuevo Usuario", stylesheet: "/css/userCreate.css"};
const userEditHeadData = {title: "Modificar Usuario", stylesheet: "/css/userEdit.css"};

const adminController = {

productCreate: (req, res) => res.render("./admin/productCreate", {head: productCreateHeadData}),

productStore: (req, res) => {
    let imagesUploaded = [];
    req.files.forEach(img => {
        imagesUploaded.push(img.filename);
    });

    let newProduct = {
        id: null,
        category: req.body.category,
        brand: req.body.brand,
        model: req.body.model,
        artNumber: Number(req.body.artNumber),
        price: Number(req.body.price),
        availability: Number(req.body.availability),
        discount: Number(req.body.discount),
        isOnSale: req.body.isOnSale=="on",
        isNew: req.body.isNew=="on",
        description: [req.body.description],
        characteristics: {},
        images: imagesUploaded,
        recommendations: []
    };

    let newProductId = database.productCreate(newProduct);

    res.redirect("/products/productDetail/"+newProductId);


},

productEdit: (req, res) => res.render("./admin/productEdit",
    {head: productEditHeadData, product: database.productGetById(req.params.id)}
    ),

productUpdate: (req, res) => {
    let editedProduct = {
        id: req.params.id,
        category: req.body.category,
        brand: req.body.brand,
        model: req.body.model,
        artNumber: Number(req.body.artNumber),
        price: Number(req.body.price),
        availability: Number(req.body.availability),
        discount: Number(req.body.discount),
        isOnSale: req.body.isOnSale=="on",
        isNew: req.body.isNew=="on",
        description: [req.body.description],
        characteristics: database.productGetById(req.params.id).characteristics,
        images: database.productGetById(req.params.id).images,
        recommendations: database.productGetById(req.params.id).recommendations
    };

    database.productEdit(editedProduct);

    res.redirect("/admin/productEdit/"+req.params.id);
},

productDestroy: (req, res) => {
    database.productDeleteById(req.params.id);
    res.redirect("/");
},

userCreate: (req, res) => {
    res.render("./admin/userCreate", {head: userCreateHeadData})
},

userStore: (req, res) => {

},

userEdit: (req, res) => {
    res.render("./admin/userEdit",
    {head: userEditHeadData}
    )
},

userUpdate: (req, res) => {

},

userDestroy: (req, res) => {

},

}


module.exports = adminController;