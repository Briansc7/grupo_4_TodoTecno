/*
Manejador de Bases de Datos relacionadas con los productos
TODO renombrar porque ya no se usa json
*/ 

const path = require("path");
const fs = require("fs");

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
const SubCategories = db.SubCategory;


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
    getSelectedCategory: getSelectedCategory,
    getAllProductsWithSomeDetails: getAllProductsWithSomeDetails,
    getAllCategoriesWithSubcategories: getAllCategoriesWithSubcategories,
    getAllProductDetailsById: getAllProductDetailsById
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

async function productSearch(keywords){

    const keywordsLowerCase = keywords.toLowerCase().split(" "); //array de keywords en miniscula

    let searchConditions = [];

    /*creo un array de condiciones de busqueda para usarlas en una consulta tipo OR
    Se ingresa una condición de búsqueda por cada keyword y por cada campo que se va a evaluar*/

    keywordsLowerCase.forEach(keyword=>{
        searchConditions.push(
            {
                model: {[Op.like]: "%"+keyword+"%"} //para búsqueda por modelo del producto
            },
            {
                "$brand.name$": {[Op.like]: "%"+keyword+"%"} //para búsqueda por nombre de la marca del producto
            },
            {
                "$subCategory.name$": {[Op.like]: "%"+keyword+"%"} //para búsqueda por nombre de la subcategoría del producto
            },
            {
                "$subCategory.category.name$": {[Op.like]: "%"+keyword+"%"} //para búsqueda por nombre de la categoría del producto
            }
        ); 
    });

    //Se incluye en la búsqueda las relaciones a tablas marcas, categorias y subcategorias para poder usarlos en los parámetros de búsqueda
    let searchResults = await Products.findAll({where: {[Op.or]:searchConditions}, include: ["productImages", 
    {model: Brands, as: "brand"}, {model: SubCategories, as: "subCategory", include: [{model: Categories, as: "category"}]}]});

    return searchResults;
}

async function getProductsFromRecommendationsByID(productId){
     let recommendations = await RelatedProducts.findAll({where: {product1: productId}, 
        include: [{model: Products, as:"productB", //forma de encadenar varios includes
        include: ["productImages"]  //include en productos
    }]});

    return recommendations;
}

async function productsThatAreNew(){ 
    let products = await Products.findAll({where: {isNew: 1}, include: ["productImages","subCategory","brand"]});
    return products;
}

async function productsThatAreOnSale(){
    let products = await Products.findAll({where: {isOnSale: 1}, include: ["productImages","subCategory","brand"]});
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

async function getAllProductsWithSomeDetails(){
    let products = await Products.findAll(
        {include: 
            [
                "productImages", 
                {model: Brands, as: "brand"}, 
                {model: SubCategories, as: "subCategory", include: [{model: Categories, as: "category"}]},
                {model: Characteristic, as: "characteristics", include: ["subCharacteristics"]}
            ]
        }
    );

    return products;
}

async function getAllCategoriesWithSubcategories(){
    let categories = await Categories.findAll({include:[
        {model: SubCategories, as: "subCategories", include: [{model: Products, as: "products"}]} 
    ]});
    return categories;
}

async function getAllProductDetailsById(id){
    let product = await Products.findByPk(id, {include: ["productImages", "brand", 
        {model: SubCategories, as: "subCategory", include: [{model: Categories, as: "category"}]},
        {model: Characteristic, as: "characteristics", include:["subCharacteristics"]},
        {model: RelatedProducts, as: "product1BoughtTogethers", include:[
            {model: Products, as: "productB", include:["brand"]}
        ]}
    ]});

    return product;
}

module.exports = database;