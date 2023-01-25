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
    getProductById: getProductById,
    deleteProductById: deleteProductById
    //usersData: usersData
}

function getProductById(id){
    return this.productsData.find(product=>product.id==id);
}

function deleteProductById(id){
    this.productsData = this.productsData.filter(product=>product.id!=id);
    let jsonRawData = JSON.stringify(this.productsData);
    fs.writeFileSync(productsJsonPath,jsonRawData);
}

module.exports = database;