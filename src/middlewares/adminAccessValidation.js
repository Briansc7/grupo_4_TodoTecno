// Middleware para restringir el acceso a determinadas rutas solamente para los usuarios de rol administrador
const createError = require('http-errors');

module.exports = (req, res, next) => {
    
    if(!isUserAdmin()){
        //El error utilizado es 404 not found en lugar de 403 Forbidden para no dar informacion sobre la estrutura de rutas de admin
        next(createError(404, "No existe la ruta especificada")); 
    }

    next();
};

function isUserAdmin(){
    return true;
}