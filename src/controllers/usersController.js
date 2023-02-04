const path = require("path");

const loginHeadData = {title: "Login", stylesheet: "/css/login.css"};
const registerHeadData = {title: "Registro", stylesheet: "/css/register.css"};

const usersController = {
login: (req, res) => res.render("./users/login", {head: loginHeadData}),
register: (req, res) => res.render("./users/register", {head: registerHeadData}),
createUser: (req, res)=> res.send(req.body.birthday)
}



module.exports = usersController;