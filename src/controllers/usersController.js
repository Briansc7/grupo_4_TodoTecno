const path = require("path");

const loginHeadData = {title: "Login", stylesheet: "/css/login.css"};
const registerHeadData = {title: "Registro", stylesheet: "/css/register.css"};

const usersController = {
login: (req, res) => res.render("./users/login", loginHeadData),
register: (req, res) => res.render("./users/register", registerHeadData)
}


module.exports = usersController;