const bcrypt = require("bcryptjs");

module.exports = {
    isUserAdmin: isUserAdmin,
    isUserRegistered: isUserRegistered
};

function isUserAdmin(req){
    //si existe obtengo el token de las cookies o de la sesión
    const token =  (req.cookies && req.cookies.token) || (req.session.user && req.session.user.token);
    //token sin encriptar correspondiente al rol administrador
    const requiredToken = "adminToken";
    //retorna true si existe el token y es un token de administrador.
    return token && bcrypt.compareSync(requiredToken, token);
}

function isUserRegistered(req){
    //si existe obtengo el token de las cookies o de la sesión
    const token =  (req.session.user && req.session.user.token) || (req.cookies && req.cookies.token);
    //si el token es distinto de indefinido, entonces equivale a true para la evaluación
    //entonces al existir un token el usuario está registrado y no es un visitante.
    return token;
}

