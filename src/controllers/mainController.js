const path = require("path");

const indexHeadData = {title: "Home", stylesheet: "/css/home.css"};

const mainController = {
home: (req, res) => res.render("index", {head: indexHeadData})
}


module.exports = mainController;