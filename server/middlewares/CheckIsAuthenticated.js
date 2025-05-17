// Middleware for protected routes
module.exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}