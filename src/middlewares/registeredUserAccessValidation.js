module.exports = (req, res, next) => {
    
    if(!isUserRegistered()){
        res.redirect("/users/login");
    }

    next();
};

function isUserRegistered(){
    return true;
}