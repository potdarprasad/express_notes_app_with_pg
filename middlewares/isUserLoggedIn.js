module.exports = (req, res, next) => {
    console.log("I'm middleware");
    if (req.session.userId) {
        return next();
    }
    return res.redirect('/');
}