module.exports = (req, res, next) => {
    res.locals.user = req.session.user || req.cookies;  
    next();
};