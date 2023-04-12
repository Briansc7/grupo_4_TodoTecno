
const path = require("path");
const bcrypt = require("bcryptjs");

const database = require(path.resolve(__dirname, "../legacyDatabase/jsonDatabase"));
const usersDatabase = require(path.resolve(__dirname, "../legacyDatabase/jsonUsersDatabase"));

const productCreateHeadData = {title: "Crear Producto", stylesheet: "/css/productCreate.css"};
const productEditHeadData = {title: "Modificar Producto", stylesheet: "/css/productEdit.css"};

const usersAddHeadData = {title: "Crear Nuevo Usuario", stylesheet: "/css/usersAdd.css"};
const usersEditHeadData = {title: "Modificar Usuario", stylesheet: "/css/usersEdit.css"};

const usersListHeadData = {title: "Listado de Usuarios", stylesheet: "/css/usersList.css"};
const usersDetailHeadData = {title: "Detalles de Usuario", stylesheet: "/css/usersDetail.css"};

const adminController = {

productCreate: async (req, res) => res.render("./admin/productCreate", {head: productCreateHeadData, brands: await database.getAllBrands()}),

productStore: async (req, res) => {
    let imagesUploaded = [];
    req.files.forEach(img => {
        imagesUploaded.push(img.filename);
    });

    /*let newProduct = {
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
    };*/

    let newProduct = {
        subCategoryId: 1,
        brandId: req.body.brand,
        model: req.body.model,
        artNumber: Number(req.body.artNumber),
        price: Number(req.body.price),
        //availability: Number(req.body.availability),
        discountPorc: Number(req.body.discount),
        isOnSale: req.body.isOnSale=="on"?1:0,
        isNew: req.body.isNew=="on"?1:0,
        description: req.body.description,
        characteristics: {},
        //images: imagesUploaded,
        //recommendations: []
    };

    //TODO hacer selectores para poder elegir la categoria, subcategoria y marca

    let createdProduct = await database.productCreate(newProduct);

    await database.AddProductImages(createdProduct.id, imagesUploaded);

    return res.redirect("/products/productDetail/"+createdProduct.id);


},

productEdit: async (req, res) => res.render("./admin/productEdit",
    {head: productEditHeadData, product: await database.productDetailGetById(req.params.id), brands: await database.getAllBrands()}
    ),

productUpdate: async (req, res) => {
    let editedProduct = {
        //id: req.params.id,
        //category: req.body.category,
        brandId: req.body.brand,
        model: req.body.model,
        artNumber: Number(req.body.artNumber),
        price: Number(req.body.price),
        //availability: Number(req.body.availability),
        discountPorc: Number(req.body.discount),
        isOnSale: req.body.isOnSale=="on"?1:0,
        isNew: req.body.isNew=="on"?1:0,
        description: req.body.description,
        //characteristics: database.productGetById(req.params.id).characteristics,
        //images: database.productGetById(req.params.id).images,
        //recommendations: database.productGetById(req.params.id).recommendations
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

usersCreate: async(req, res) => {
        let newUser={
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 10),
        birthday:req.body.birthday,
        address:req.body.address,
        zipCode:req.body.zipCode,
        location:req.body.location,
        province:req.body.province,
        roleId:2 //req.body.roleId
    };
    await usersDatabase.userCreate(newUser);

    return res.redirect("/admin/users");
},

usersEdit:  async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await usersDatabase.userFindById(userId);

        return res.render("./admin/usersEdit", {
            head: usersEditHeadData,
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
}
,

usersUpdate:async (req, res) => {
    let editedUser={
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 10),
        birthday:req.body.birthday,
        address:req.body.address,
        zipCode:req.body.zipCode,
        location:req.body.location,
        province:req.body.province,
        roleId:2 //req.body.roleId
    };
    await usersDatabase.usersUpdate(editedUser);

    return res.redirect("/admin/users");
},

usersDestroy: async (req, res) => {
    await database.userDeleteById(req.params.id);
    return res.redirect("/admin/users");
},

}


module.exports = adminController;
