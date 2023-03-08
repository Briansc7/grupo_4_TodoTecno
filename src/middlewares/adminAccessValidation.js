// Middleware para restringir el acceso a determinadas rutas solamente para los usuarios de rol administrador
const createError = require('http-errors');
const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
    
    if(!isUserAdmin(req)){
        //El error utilizado es 404 not found en lugar de 403 Forbidden para no dar informacion sobre la estrutura de rutas de admin
        res.status(404).render("not-found");
    }else{
        next();
    }
    
};

function isUserAdmin(req){
    //si existe obtengo el token de las cookies o de la sesión
    const token =  (req.cookies && req.cookies.token) || (req.session.user && req.session.user.token);
    //token sin encriptar correspondiente al rol administrador
    const requiredToken = "adminToken";
    //retorna true si existe el token y es un token de administrador.
    return token && bcrypt.compareSync(requiredToken, token);
}