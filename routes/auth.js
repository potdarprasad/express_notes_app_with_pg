const router = require('express').Router();
const authService = require('../services/auth.service');

// Log In Routes
router.get('/login', (req, res) => {
    res.render('auth/login', { email: '', password: '', errors: [] });
});

router.post('/login', authService.logInUser);

router.get('/register', (req, res) => {
    res.render('auth/register', { firstName: '', lastName: '', email: '', password: '', errors: [] });
});

router.post('/register', authService.registerUser);

router.get('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;