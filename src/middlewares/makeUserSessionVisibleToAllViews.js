module.exports = (req, res, next) => {
    res.locals.currentUser = req.session.user || req.cookies;  
    next();
};