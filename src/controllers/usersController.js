const path = require("path");
const { validationResult } = require("express-validator");
const usersDatabase = require(path.resolve(__dirname, "../legacyDatabase/jsonUsersDatabase"));

const loginHeadData = {title: "Login", stylesheet: "/css/login.css"};
const registerHeadData = {title: "Registro", stylesheet: "/css/register.css"};
const profileHeadData = {title: "Perfil", stylesheet: "/css/profile.css"};
const editProfileHeadData = {title: "Editar Perfil", stylesheet: "/css/usersAdd.css"};

const usersController = {
login: (req, res) => res.render("./users/login", {head: loginHeadData}),
register: (req, res) => res.render("./users/register", {head: registerHeadData}),
createUser: (req, res)=> {
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        if(usersDatabase.userRegister(req.body, req.file) == -1){ //se procede a registrar al usuario
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
loginSubmit: async (req, res) => {
    const errors = validationResult(req);
    
    if(errors.isEmpty()){

        if(await usersDatabase.checkPassword(req.body.email, req.body.password)){
            const name = await usersDatabase.userGetName(req.body.email);
            const token = await usersDatabase.userGetToken(req.body.email);
            const userId = await usersDatabase.userGetUserId(req.body.email);
            req.session.user = {
                name: name,
                token: token,
                userId: userId
            };

            if(req.body.rememberUser == "on"){
                res.cookie("name", name, {maxAge: 9999999});
                res.cookie("token", token, {maxAge: 9999999});
                res.cookie("userId", userId, {maxAge: 9999999});
            }

            return res.redirect("/");
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
},
profile: async (req, res) => {
    const userId = (req.cookies && req.cookies.userId) || (req.session.user && req.session.user.userId);
    const user = await usersDatabase.userFindById(userId);

    return res.render("./users/profile", {
        userInfo: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            address: user.address,
            postalCode: user.zipCode,
            location: user.location,
            province: user.province,
            image: user.image
        }, 
        head: profileHeadData
    });
},
editProfile: async (req, res) => {
    try {
        const userId = (req.cookies && req.cookies.userId) || (req.session.user && req.session.user.userId);
        const user = await usersDatabase.userFindById(userId);

        return res.render("./users/editProfile", {
            head: editProfileHeadData,
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
},
updateProfile: async (req, res) => {
    try {
        const userId = (req.cookies && req.cookies.userId) || (req.session.user && req.session.user.userId);

        /*Solamente se van a mandar al update los campos que no están vacíos*/
    let editedUser={};  //aca se van a cargar los inputs para el update
    Object.entries(req.body).forEach(entry => { //se iteran los campos del objeto req.body
        const [property, value] = entry;      //se separa en clave valor
    
        if(value&&value!=""&&property!="roleId"){
            let updatedValue = value;

            if(property=="password"){ //si el input leido es password, se tiene que encriptar
                updatedValue = bcrypt.hashSync(updatedValue, 10);
            }
            
            editedUser[property] = updatedValue; //se almacena el input que se va a actualizar el valor
        }

    });
    
    await usersDatabase.userUpdate(userId, editedUser);

    return res.redirect("/users/profile");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
    }
},
logout: (req, res) => {
    //borro de la sesion y de las cookies los datos del usuario
    req.session.user = null;
    res.clearCookie("name");
    res.clearCookie("token");
    res.clearCookie("userId");

    return res.redirect("/");
}
}



module.exports = usersController;