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
    productEdit: productEdit
    
    //usersData: usersData
}

function productGetById(id){
    return this.productsData.find(product=>product.id==id);
}

function productDeleteById(id){
    this.productsData = this.productsData.filter(product=>product.id!=id);
    writeJson(productsJsonPath, this.productsData);
}

function writeJson(destination, data) {
    let jsonRawData = JSON.stringify(data);
    fs.writeFileSync(destination, jsonRawData);
}

function productGetNewId(){
    return Math.max(this.productsData.map(product=>product.id))+1;
}

function productCreate(product){
    product.id = this.productGetNewId();
    this.productsData.push(product);
    writeJson(productsJsonPath, this.productsData);

}

function productEdit(productEdited){
    let productToEdit = this.productGetById(productEdited.id);
    
    Object.assign(productToEdit,productEdited);

    writeJson(productsJsonPath, this.productsData);

}

module.exports = database;