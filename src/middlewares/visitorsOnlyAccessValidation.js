//Middleware para que restringir el acceso a determinadas rutas solamente para usuarios NO registrados (visitantes)

const path = require("path");
let authTokenUtilities = require(path.resolve(__dirname,"../database/authTokenUtilities"));

module.exports = (req, res, next) => {
    
    if(authTokenUtilities.isUserRegistered(req)){
        console.log("redirect a profile");
        res.redirect("/users/profile");
    }else{
        next();
    }

    
};