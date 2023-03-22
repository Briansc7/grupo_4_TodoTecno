/*
Manejador de Tablas Json. Esta lógica también podría ir en el controlador
*/ 

const path = require("path");
const fs = require("fs");

//Se obtienen los datos de los productos
const productsJsonPath = path.resolve(__dirname,"./products.json");
let productsJsonRawData = fs.readFileSync(productsJsonPath); //guardo contenido json en variable
let productsData = JSON.parse(productsJsonRawData); //convierto json a objeto array

//Se obtienen los datos de los productos
/*const usersJsonPath = path.resolve(__dirname,"./users.json");
let usersJsonRawData = fs.readFileSync(usersJsonPath); //guardo contenido json en variable
let usersData = JSON.parse(usersJsonRawData); //convierto json a objeto array*/

let database = {
    productsData: productsData,
    productGetById: productGetById,
    productDeleteById: productDeleteById,
    productGetNewId: productGetNewId,
    productCreate: productCreate,
    productEdit: productEdit,
    productSearch: productSearch,
    getProductsFromRecommendationsByID: getProductsFromRecommendationsByID,
    productsThatAreNew: productsThatAreNew,
    productsThatAreOnSale: productsThatAreOnSale
    
    //usersData: usersData
}

function productGetById(id){
    return this.productsData.find(product=>product.id==id);
}

function productDeleteById(id){

    const images = this.productGetById(id).images;
    const imagesFolder = path.resolve(__dirname, "../../public/images/products/");

   
    images.forEach(file => {
        fs.unlink(path.join(imagesFolder, file), (err) => {
            if (err)
            throw err;
            console.log(`Borrado archivo: ${file}`);
        });
    });
    console.log("Borrado de imágenes completado");


    this.productsData = this.productsData.filter(product=>product.id!=id);
    writeJson(productsJsonPath, this.productsData);
}

function writeJson(destination, data) {
    let jsonRawData = JSON.stringify(data, null, 2);
    fs.writeFileSync(destination, jsonRawData);
}

function productGetNewId(){
    return Math.max.apply(Math,this.productsData.map(product=>product.id))+1;
}

function productCreate(product){
    product.id = this.productGetNewId();
    this.productsData.push(product);
    writeJson(productsJsonPath, this.productsData);

    return product.id;

}

function productEdit(productEdited){
    let productToEdit = this.productGetById(productEdited.id);
    
    Object.assign(productToEdit,productEdited);

    writeJson(productsJsonPath, this.productsData);

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

function getProductsFromRecommendationsByID(productId){
    //array de ids de recomendaciones -> array productos recomendados -> filtrado de valores invalidos como undefined
    return this.productGetById(productId).recommendations.map(recomendationId => this.productGetById(recomendationId)).filter(value=>value);
}

function productsThatAreNew(){
    return this.productsData.filter(prod=>prod.isNew); 
}

function productsThatAreOnSale(){
    return this.productsData.filter(prod=>prod.isOnSale);
}

module.exports = database;