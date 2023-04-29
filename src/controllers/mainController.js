const path = require("path");
const database = require(path.resolve(__dirname, "../legacyDatabase/jsonDatabase"));

const diccionary = require(path.resolve(__dirname, "../diccionary/"));
const headData = diccionary.headData;

const indexHeadData = headData.main.home;
const searchHeadData = headData.main.search;

const mainController = {
home: async (req, res) => res.render("index", {head: indexHeadData, productsNew: await database.productsThatAreNew(), productsOnSale: await database.productsThatAreOnSale()}),

search: async (req, res) => {    
    let results = await database.productSearch(req.query.keywords);

    res.render("search", {head: searchHeadData, products: results});
}
};

 
module.exports = mainController;