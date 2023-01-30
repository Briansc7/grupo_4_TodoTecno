const path = require("path");
const database = require(path.resolve(__dirname, "../database/jsonDatabase"));

const indexHeadData = {title: "Home", stylesheet: "/css/home.css"};
const searchHeadData = {title: "Búsqueda", stylesheet: "/css/search.css"};

const mainController = {
home: (req, res) => res.render("index", {head: indexHeadData}),

search: (req, res) => {    
    let results = database.productSearch(req.query.keywords);

    res.render("search", {head: searchHeadData, products: results});
}
};


module.exports = mainController;