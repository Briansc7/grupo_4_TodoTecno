const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
    
    if(isUserAdmin(req)){
        //Si el usuario es administrador, se va a mostrar en la vista las opciones especificas de administrador
        res.locals.isAdmin = true;
    }
        
    next();
    
    
};

function isUserAdmin(req){
    //si existe obtengo el token de las cookies o de la sesión
    const token =  (req.cookies && req.cookies.token) || (req.session.user && req.session.user.token);
    //token sin encriptar correspondiente al rol administrador
    const requiredToken = "adminToken";
    //retorna true si existe el token y es un token de administrador.
    return token && bcrypt.compareSync(requiredToken, token);
}