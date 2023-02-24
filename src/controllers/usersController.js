const path = require("path");
const { validationResult } = require("express-validator");
const usersDatabase = require(path.resolve(__dirname, "../database/jsonUsersDatabase"));

const loginHeadData = {title: "Login", stylesheet: "/css/login.css"};
const registerHeadData = {title: "Registro", stylesheet: "/css/register.css"};

const usersController = {
login: (req, res) => res.render("./users/login", {head: loginHeadData}),
register: (req, res) => res.render("./users/register", {head: registerHeadData}),
createUser: (req, res)=> {
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        if(usersDatabase.userRegister(req.body) == -1){ //se procede a registrar al usuario
            //No se pudo registrar porque ya existe un usuario con ese email
            errors.errors = [{
                value: "",
                msg: "Ya existe un usuario registrado con este email",
                param: "email",
                location: "body"
            }];

            const old = req.body;
        
            return res.render("./users/register", {errors: errors.mapped(), old: old, head: registerHeadData});

        };

        // El registro fue exitoso
        res.redirect("/");
    }

    //Hubo errores en el formato en el que se ingresaron los datos de registro

    const old = req.body;

    console.log(errors);

    return res.render("./users/register", {errors: errors.mapped(), old: old, head: registerHeadData});
},
loginSubmit: (req, res) => {
    const errors = validationResult(req);
    
    if(errors.isEmpty()){

        if(usersDatabase.checkPassword(req.body.email, req.body.password)){
            const name = usersDatabase.userGetName(req.body.email);
            req.session.user = {
                name: name
            };
            res.redirect("/");
        }
        else{
            errors.errors = [{
                value: "",
                msg: "Email o contraseña inválido",
                param: "email",
                location: "body"
            }];
        }

        
    }

    const old = {
        email: req.body.email
    };

    return res.render("./users/login", {errors: errors.mapped(), old: old, head: loginHeadData});
}
}



module.exports = usersController;