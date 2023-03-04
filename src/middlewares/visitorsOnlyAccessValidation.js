//Middleware para que restringir el acceso a determinadas rutas solamente para usuarios NO registrados (visitantes)
module.exports = (req, res, next) => {
    
    if(isUserRegistered()){
        res.redirect("/users/profile");
    }

    next();
};

function isUserRegistered(){
    return false;
}