const createError = require('http-errors');

module.exports = (req, res, next) => {
    
    if(!isUserAdmin()){
        createError(404);
    }

    next();
};

function isUserAdmin(){
    return true;
}