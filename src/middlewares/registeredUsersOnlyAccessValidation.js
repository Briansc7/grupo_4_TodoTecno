//Middleware para que restringir el acceso a determinadas rutas solamente para usuarios registrados y no para visitantes
module.exports = (req, res, next) => {
    
    if(!isUserRegistered()){
        res.redirect("/users/login");
    }

    next();
};

function isUserRegistered(){
    return true;
}