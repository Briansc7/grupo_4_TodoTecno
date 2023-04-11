
const path = require("path");

const database = require(path.resolve(__dirname, "../legacyDatabase/jsonDatabase"));
const usersDatabase = require(path.resolve(__dirname, "../legacyDatabase/jsonUsersDatabase"));

const productCreateHeadData = {title: "Crear Producto", stylesheet: "/css/productCreate.css"};
const productEditHeadData = {title: "Modificar Producto", stylesheet: "/css/productEdit.css"};

const usersAddHeadData = {title: "Crear Nuevo Usuario", stylesheet: "/css/usersAdd.css"};
const usersEditHeadData = {title: "Modificar Usuario", stylesheet: "/css/usersEdit.css"};

const usersListHeadData = {title: "Listado de Usuarios", stylesheet: "/css/usersList.css"};
const usersDetailHeadData = {title: "Detalles de Usuario", stylesheet: "/css/usersDetail.css"};

const adminController = {

productCreate: async (req, res) => res.render("./admin/productCreate", {head: productCreateHeadData, categories: await database.getAllCategories()}),

productStore: async (req, res) => {
    let imagesUploaded = [];
    req.files.forEach(img => {
        imagesUploaded.push(img.filename);
    });

    let newProduct = {
        subCategoryId: req.body.subCategory,
        brandId: req.body.brand,
        model: req.body.model,
        artNumber: Number(req.body.artNumber),
        price: Number(req.body.price),
        discountPorc: Number(req.body.discount),
        isOnSale: req.body.isOnSale=="on"?1:0,
        isNew: req.body.isNew=="on"?1:0,
        description: req.body.description
    };

    let createdProduct = await database.productCreate(newProduct);

    await database.AddProductImages(createdProduct.id, imagesUploaded);

    return res.redirect("/products/productDetail/"+createdProduct.id);


},

productEdit: async (req, res) => res.render("./admin/productEdit",
    {head: productEditHeadData, product: await database.productDetailGetById(req.params.id), categories: await database.getAllCategories(), selectedCategory: await database.getSelectedCategory(req.params.id)}
    ),

productUpdate: async (req, res) => {
    let editedProduct = {
        brandId: req.body.brand,
        model: req.body.model,
        artNumber: Number(req.body.artNumber),
        price: Number(req.body.price),
        discountPorc: Number(req.body.discount),
        isOnSale: req.body.isOnSale=="on"?1:0,
        isNew: req.body.isNew=="on"?1:0,
        description: req.body.description
    };

    await database.productEdit(req.params.id, editedProduct);

    return res.redirect("/admin/productEdit/"+req.params.id);
},

productDestroy: async (req, res) => {
    await database.productDeleteById(req.params.id);
    return res.redirect("/");
},

usersAdd: (req, res) => {
    return res.render("./admin/usersAdd", {head: usersAddHeadData})
},

usersList: async (req, res) => {
    let users = await usersDatabase.getAllUsers();

    return res.render("./admin/usersList", {head: usersListHeadData, users})
},

usersDetail: async (req, res) =>{
    let id = req.params.id;

    let user = await usersDatabase.getUserByPk(id);

    return res.render("./admin/usersDetail", {head: usersDetailHeadData, user});
},

usersCreate: (req, res) => {
    
},

usersEdit: (req, res) => {
    return res.render("./admin/usersEdit",
    {head: usersEditHeadData}
    )
},

usersUpdate: (req, res) => {

},

usersDestroy: (req, res) => {

},

}


module.exports = adminController;
