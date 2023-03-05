//Middleware para que restringir el acceso a determinadas rutas solamente para usuarios registrados y no para visitantes
module.exports = (req, res, next) => {
    
    if(!isUserRegistered(req)){
        console.log("redirect a login");
        res.redirect("/users/login");
    }else{
        next();
    }

    
};

function isUserRegistered(req){
    //si existe obtengo el token de las cookies o de la sesión
    const token =  (req.cookies && req.cookies.token) || (req.session.user && req.session.user.token);
    //si el token es distinto de indefinido, entonces equivale a true para la evaluación
    //entonces al existir un token el usuario está registrado y no es un visitante.
    return token != undefined;
}