module.exports = (req, res, next) => {
    res.locals.user = req.cookies || req.session.user;    
    next();
};