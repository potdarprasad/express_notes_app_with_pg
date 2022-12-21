const router = require('express').Router();
const authService = require('../services/auth.service');

// Log In Routes
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', authService.logInUser);

router.get('/register', (req, res) => {
    res.render('auth/register');
});


router.post('/register', authService.registerUser);

module.exports = router;