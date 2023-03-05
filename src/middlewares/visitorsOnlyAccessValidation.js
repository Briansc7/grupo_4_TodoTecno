//Middleware para que restringir el acceso a determinadas rutas solamente para usuarios NO registrados (visitantes)
module.exports = (req, res, next) => {
    
    if(isUserRegistered(req, res)){
        console.log("redirect a profile");
        res.redirect("/users/profile");
    }else{
        next();
    }

    
};

function isUserRegistered(req, res){
    //si existe obtengo el token de las cookies o de la sesión
    const token =  (req.session.user && req.session.user.token) || (req.cookies && req.cookies.token);
    //si el token es distinto de indefinido, entonces equivale a true para la evaluación
    //entonces al existir un token el usuario está registrado y no es un visitante.
    return token != undefined;
}