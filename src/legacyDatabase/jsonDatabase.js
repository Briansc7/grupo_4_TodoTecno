/*
Manejador de Tablas Json. Esta lógica también podría ir en el controlador
*/ 

const path = require("path");
const fs = require("fs");

//Se obtienen los datos de los productos
const productsJsonPath = path.resolve(__dirname,"./products.json");
let productsJsonRawData = fs.readFileSync(productsJsonPath); //guardo contenido json en variable
let productsData = JSON.parse(productsJsonRawData); //convierto json a objeto array

//agregado uso de BD mysql
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Products = db.Product;
const ProductImages = db.ProductImage;
const RelatedProducts = db.BoughtTogether;
const Characteristic = db.Characteristic;
const Brands = db.Brand;
const Categories = db.Category;


let database = {
    productGetById: productGetById,
    productDeleteById: productDeleteById,
    productGetNewId: productGetNewId,
    productCreate: productCreate,
    AddProductImages: AddProductImages,
    productEdit: productEdit,
    productSearch: productSearch,
    getProductsFromRecommendationsByID: getProductsFromRecommendationsByID,
    productsThatAreNew: productsThatAreNew,
    productsThatAreOnSale: productsThatAreOnSale,
    productDetailGetById: productDetailGetById,
    getAllProducts: getAllProducts,
    getAllBrands: getAllBrands,
    getAllCategories: getAllCategories,
    getSelectedCategory: getSelectedCategory
}

async function productGetById(id){
    let product = await Products.findByPk(id);

    return product;
}

async function productDetailGetById(id){
    let product = await Products.findByPk(id, {include: ["productImages", "brand", "subCategory",
        {model: Characteristic, as: "characteristics",
            include:["subCharacteristics"]}]});

    return product;
}

async function productDeleteById(id){

    const images = await ProductImages.findAll({where: {productId: id}});
    const imagesFolder = path.resolve(__dirname, "../../public/images/products/");

   
    images.forEach(file => {
        fs.unlink(path.join(imagesFolder, file.fileName), (err) => {
            if (err)
            throw err;
            console.log(`Borrado archivo: ${file.fileName}`);
        });
    });
    console.log("Borrado de imágenes completado");

    await ProductImages.destroy({where: {productId: id}});
    await Products.destroy({where: {id}});

}


function productGetNewId(){
    return Math.max.apply(Math,this.productsData.map(product=>product.id))+1;
}

async function productCreate(product){

    let newProduct = await Products.create(product);
    return newProduct;

}

async function AddProductImages(productId, images){

    for (const fileName of images){
        await ProductImages.create({fileName, productId})
    }
    
}

async function productEdit(id, productEdited){

    await Products.update(productEdited, {where: {id}});

}

function productSearch(keywords){
    const keywordsLowerCase = keywords.toLowerCase().split(" "); //array de keywords en miniscula
    let searchResults = this.productsData.filter(product => {
        const category = product.category.toLowerCase();
        const brand = product.brand.toLowerCase();
        const model = product.model.toLowerCase();
        const completeName = category+brand+model; //string unico con todos los campos a buscar
        return keywordsLowerCase.some(keyword => completeName.includes(keyword)); //comprueba si encuentra al menos un keyword en el string
    });
    return searchResults; //array de productos filtrados que cumplen con almenos uno de los keywords
}

async function getProductsFromRecommendationsByID(productId){
     let recommendations = await RelatedProducts.findAll({where: {product1: productId}, 
        include: [{model: Products, as:"productB", //forma de encadenar varios includes
        include: ["productImages"]  //include en productos
    }]});

    return recommendations;
}

async function productsThatAreNew(){ 
    let products = await Products.findAll({where: {isNew: 1}, include: ["productImages"]});
    return products;
}

async function productsThatAreOnSale(){
    let products = await Products.findAll({where: {isOnSale: 1}, include: ["productImages"]});
    return products;
}

async function getAllProducts(){
    let products = await Products.findAll({include: ["productImages"]});
    return products;
}

async function getAllBrands(){
    let brands = await Brands.findAll();
    return brands;
}

async function getAllCategories(){
    let categories = await Categories.findAll();
    return categories;
}

async function getSelectedCategory(productId){
    let product = await Products.findByPk(productId,{include:["subCategory"]});
    let categoryId = product.subCategory.categoryId;
    let Category = await Categories.findByPk(categoryId,{include:["subCategories","brandsOfCategory"]});
    return Category;
}

module.exports = database;