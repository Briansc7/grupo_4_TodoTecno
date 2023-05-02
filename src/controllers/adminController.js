
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const database = require(path.resolve(__dirname, "../legacyDatabase/jsonDatabase"));
const usersDatabase = require(path.resolve(__dirname, "../legacyDatabase/jsonUsersDatabase"));

const diccionary = require(path.resolve(__dirname, "../diccionary/"));
const frontValidationData = diccionary.frontValidationData;
const headData = diccionary.headData;

const productCreateHeadData = headData.admin.productCreate;
const productEditHeadData = headData.admin.productEdit;

const usersAddHeadData = headData.admin.usersAdd;
const usersEditHeadData = headData.admin.usersEdit;

const usersListHeadData = headData.admin.usersList;
const usersDetailHeadData = headData.admin.usersDetail;

const adminController = {

productCreate: async (req, res) => res.render("./admin/productCreate",
    {
        head: productCreateHeadData, 
        categories: await database.getAllCategories(),
        form_name: frontValidationData.product.form_name, 
        view_name: frontValidationData.product.view_name
    }),

productStore: async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){ //si hay errores
            let old = req.body;

            return res.render("./admin/productCreate", 
            {
                head: productCreateHeadData, 
                categories: await database.getAllCategories(), 
                errors: errors.mapped(), 
                old: old,
                form_name: frontValidationData.product.form_name, 
                view_name: frontValidationData.product.view_name
            })
        }

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
        
        let imagesUploaded = [];
        req.files.forEach(img => {
            imagesUploaded.push(img.filename);
        });
    
        if(imagesUploaded.length != 0){
            await database.AddProductImages(createdProduct.id, imagesUploaded);
        }
    
        return res.redirect("/products/productDetail/"+createdProduct.id);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
    

    


},

productEdit: async (req, res) => res.render("./admin/productEdit",
    {
        head: productEditHeadData, product: await database.productDetailGetById(req.params.id), 
        categories: await database.getAllCategories(), 
        selectedCategory: await database.getSelectedCategory(req.params.id),
        form_name: frontValidationData.product.form_name, 
        view_name: frontValidationData.product.view_name
    }
    ),

productUpdate: async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){ //si hay errores
            let old = req.body;

            return res.render("./admin/productEdit", 
            {
                head: productEditHeadData, 
                categories: await database.getAllCategories(),
                selectedCategory: await database.getSelectedCategory(req.params.id), 
                errors: errors.mapped(), product: old,
                form_name: frontValidationData.product.form_name, 
                view_name: frontValidationData.product.view_name
            })
        }

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
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
    
},

productDestroy: async (req, res) => {
    try {
        await database.productDeleteById(req.params.id);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
    
},

usersAdd: (req, res) => {
    return res.render("./admin/usersAdd", {head: usersAddHeadData, 
        form_name: frontValidationData.user.form_name, view_name: frontValidationData.user.view_name});
},

usersList: async (req, res) => {
    try {
        let users = await usersDatabase.getAllUsers();

        return res.render("./admin/usersList", {head: usersListHeadData, users});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
    
},

usersDetail: async (req, res) =>{
    try {
        let id = req.params.id;

        let user = await usersDatabase.userFindById(id);

        user.id = id;

    return res.render("./admin/usersDetail", {head: usersDetailHeadData, userInfo: user});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
    
},

usersCreate: async(req, res) => {
    try {
        const errors = validationResult(req);

        if(await emailExist(req.body.email)){
            if(errors.isEmpty()){
                errors.errors= [];
            }

            errors.errors.push({
                value: "",
                msg: "Ya existe un usuario registrado con este email",
                param: "email",
                location: "body"
            });
        }

        if(errors.isEmpty()){

            let avatar = req.file

            let newUserInfo={
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password, 10),
                birthday:req.body.birthday,            
                image: avatar?avatar.filename:null,
                roleId: req.body.roleId
            };

            let newUserContactInfo ={
                address:req.body.address,
                zipCode:req.body.zipCode,
                location:req.body.location,
                province:req.body.province,
                phone: req.body.phone
            }

            await usersDatabase.userCreate(newUserInfo, newUserContactInfo);
        
            return res.redirect("/admin/users");

        }else{
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                password: req.body.password,
                birthday:req.body.birthday,
                roleId: req.body.roleId,

                userContactInformation: {
                    address:req.body.address,
                    zipCode:req.body.zipCode,
                    location:req.body.location,
                    province:req.body.province,
                    phone: req.body.phone
                }
            };

            return res.render("./admin/usersAdd", {errors: errors.mapped(), user: user, head: usersAddHeadData, 
                form_name: frontValidationData.user.form_name, view_name: frontValidationData.user.view_name});
        }

        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }

        
},

usersEdit:  async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await usersDatabase.userFindById(userId);

        return res.render("./admin/usersEdit", {
            head: usersEditHeadData,
            user: user,
            form_name: frontValidationData.edit_profile.form_name, 
            view_name: frontValidationData.edit_profile.view_name
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
}
,

usersUpdate:async (req, res) => {
    try {
        let id = req.params.id; 

        const errors = validationResult(req);

        if(await anotherUserHasThisEmail(id, req.body.email)){ //compruebo si otro usuario ya usa el email ingresado
            if(errors.isEmpty()){
                errors.errors= [];
            }

            errors.errors.push({
                value: "",
                msg: "Ya existe un usuario registrado con este email",
                param: "email",
                location: "body"
            });
        }
        
        if(errors.isEmpty()){

            let editedUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birthday: req.body.birthday,
                roleId: req.body.roleId
            }
    
            if(req.body.password!= ""){
                editedUser.password = bcrypt.hashSync(req.body.password, 10);
            }
    
            let editedUserContactInfo = null;
    
            //si se ingresó alguno de los campos
            if(req.body.address != "" ||
                req.body.location != "" ||
                req.body.province != "" ||
                req.body.zipCode != "" ||
                req.body.phone != ""
                ){
                    editedUserContactInfo = {
                        address: req.body.address,
                        location: req.body.location,
                        province: req.body.province,
                        zipCode: req.body.zipCode,
                        phone: req.body.phone
                    };
                }
    
            
    
            await usersDatabase.userUpdate(id, editedUser, editedUserContactInfo);
    
            return res.redirect("/admin/users");

        }else{
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                password: req.body.password,
                birthday:req.body.birthday,
                roleId: req.body.roleId,

                userContactInformation: {
                    address:req.body.address,
                    zipCode:req.body.zipCode,
                    location:req.body.location,
                    province:req.body.province,
                    phone: req.body.phone
                }
            };

            return res.render("./admin/usersEdit", {errors: errors.mapped(), user: user, head: usersAddHeadData, 
                form_name: frontValidationData.edit_profile.form_name, view_name: frontValidationData.edit_profile.view_name});
        }

        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }

    
},

usersDestroy: async (req, res) => {
    try {
        await usersDatabase.userDeleteById(req.params.id);
        return res.redirect("/admin/users");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
},

}

async function emailExist(email){
    return await usersDatabase.userFindByEmail(email);
}

async function anotherUserHasThisEmail(userId, emailUpdated){
    let founduserId = await usersDatabase.userGetUserId(emailUpdated);
    return founduserId && (founduserId != userId);
}

module.exports = adminController;
