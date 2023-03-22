// Middleware para restringir el acceso a determinadas rutas solamente para los usuarios de rol administrador

const path = require("path");
let authTokenUtilities = require(path.resolve(__dirname,"../legacyDatabase/authTokenUtilities"));

module.exports = (req, res, next) => {
    
    if(!authTokenUtilities.isUserAdmin(req)){
        //El error utilizado es 404 not found en lugar de 403 Forbidden para no dar informacion sobre la estrutura de rutas de admin
        res.status(404).render("not-found");
    }else{
        next();
    }
    
};
