const path = require("path");
let authTokenUtilities = require(path.resolve(__dirname,"../database/authTokenUtilities"));

module.exports = (req, res, next) => {
    
    if(authTokenUtilities.isUserAdmin(req)){
        //Si el usuario es administrador, se va a mostrar en la vista las opciones especificas de administrador
        res.locals.isAdmin = true;
    }
        
    next();
    
    
};

