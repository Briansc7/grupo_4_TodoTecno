const path = require("path");
const database = require(path.resolve(__dirname, "../legacyDatabase/jsonDatabase"));

const indexHeadData = {title: "Home", stylesheet: "/css/home.css"};
const searchHeadData = {title: "Búsqueda", stylesheet: "/css/search.css"};

const mainController = {
home: async (req, res) => res.render("index", {head: indexHeadData, productsNew: await database.productsThatAreNew(), productsOnSale: await database.productsThatAreOnSale()}),

search: async (req, res) => {    
    let results = await database.productSearch(req.query.keywords);

    res.render("search", {head: searchHeadData, products: results});
}
};

 
module.exports = mainController;