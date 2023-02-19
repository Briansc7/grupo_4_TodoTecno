const path = require("path");
const { validationResult } = require("express-validator");

const loginHeadData = {title: "Login", stylesheet: "/css/login.css"};
const registerHeadData = {title: "Registro", stylesheet: "/css/register.css"};

const usersController = {
login: (req, res) => res.render("./users/login", {head: loginHeadData}),
register: (req, res) => res.render("./users/register", {head: registerHeadData}),
createUser: (req, res)=> {
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        res.redirect("/");
    }

    const old = req.body;

    console.log(errors);

    return res.render("./users/register", {errors: errors.mapped(), old: old, head: registerHeadData});
},
loginSubmit: (req, res) => {
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        res.redirect("/");
    }

    const old = {
        email: req.body.email
    };

    return res.render("./users/login", {errors: errors.mapped(), old: old, head: loginHeadData});
}
}



module.exports = usersController;