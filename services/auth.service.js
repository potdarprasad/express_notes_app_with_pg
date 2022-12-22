const pool = require('../config/db.config');

class AuthService {
    async registerUser(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;

            const user = (await pool.query(`SELECT * FROM users WHERE email = $1`, [email]))?.rows[0];
            if (user) {
                res.render('auth/register', { firstName, lastName, email, password, errors: ['User with this email already exists'] });
            }

            await pool.query(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`, [
                firstName, lastName, email, password
            ]);
            res.redirect('/auth/login');
        } catch (error) {
            res.render('error', { message: error.message, error });
        }
    }

    async logInUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = (await pool.query(`SELECT * FROM users WHERE email = $1`, [email]))?.rows[0];

            if (!user) {
                console.log('user not found');
                res.render('auth/login', { email, password, errors: ['User does not exists'] });
            }

            if (user.password === password) {
                req.session.email = user.email;
                req.session.userId = user.id;
                res.redirect('/notes');
            } else {
                res.render('auth/login', { email, password, errors: ['Invalid username or password'] });
            }
        } catch (error) {
            res.render('error', { message: error.message, error });
        }
    }
}

module.exports = new AuthService();