const bcrypt = require("bcryptjs");

module.exports = {
    isUserAdmin: isUserAdmin,
    isUserRegistered: isUserRegistered,
    generateToken: generateToken
};

function isUserAdmin(req){
    //si existe obtengo el token de las cookies o de la sesión
    const token =  (req.cookies && req.cookies.token) || (req.session.user && req.session.user.token);
    //si existe obtengo el user id de las cookies o de la sesión
    const userId =  (req.cookies && req.cookies.userId) || (req.session.user && req.session.user.userId);
    //token sin encriptar correspondiente al rol administrador
    const requiredToken = userId+"adminToken";
    //retorna true si existe el token, el user id y el token es valido para ese usuario y de rol administrador.
    return token && userId && bcrypt.compareSync(requiredToken, token);
}

function isUserRegistered(req){
    //si existe obtengo el token de las cookies o de la sesión
    const token =  (req.session.user && req.session.user.token) || (req.cookies && req.cookies.token);
    //si existe obtengo el user id de las cookies o de la sesión
    const userId =  (req.cookies && req.cookies.userId) || (req.session.user && req.session.user.userId);
    //tokens sin encriptar correspondiente al rol usurio y al rol administrador
    const requiredTokenOption1 = userId+"userToken";
    const requiredTokenOption2 = userId+"adminToken";    
    //retorna true si existe el token, el user id y el token es valido para ese usuario y para alguno de los roles
    return token && userId && (bcrypt.compareSync(requiredTokenOption1, token) || bcrypt.compareSync(requiredTokenOption2, token));
}

function generateToken(user){
    return bcrypt.hashSync(user.id+user.role+"Token", 10);
}

