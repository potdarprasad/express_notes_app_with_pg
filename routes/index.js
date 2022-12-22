const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/notes');
    }
    res.redirect('/auth/login');
});

module.exports = router;