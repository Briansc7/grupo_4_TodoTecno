
const path = require("path");

const database = require(path.resolve(__dirname, "../database/jsonDatabase"));

const productCreateHeadData = {title: "Crear Producto", stylesheet: "/css/productCreate.css"};
const productEditHeadData = {title: "Modificar Producto", stylesheet: "/css/productEdit.css"};

const usersAddHeadData = {title: "Crear Nuevo Usuario", stylesheet: "/css/usersAdd.css"};
const usersEditHeadData = {title: "Modificar Usuario", stylesheet: "/css/usersEdit.css"};

const usersListHeadData = {title: "Listado de Usuarios", stylesheet: "/css/usersList.css"};

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

usersAdd: (req, res) => {
    res.render("./admin/usersAdd", {head: usersAddHeadData})
},

usersList: (req, res) => {
    res.render("./admin/usersList", {head: usersListHeadData})
},

usersCreate: (req, res) => {

},

usersEdit: (req, res) => {
    res.render("./admin/usersEdit",
    {head: usersEditHeadData}
    )
},

usersUpdate: (req, res) => {

},

usersDestroy: (req, res) => {

},

}


module.exports = adminController;