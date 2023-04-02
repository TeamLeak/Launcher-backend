const express = require('express');
const router = express.Router();

/* Обрабатываем GET, вернув ему login.ejs */
router.get('/', function(req, res, next) {
    // Render the login page
    res.render('login', { title: 'LOGIN' });
});

// Обрабатываем POST из формы, если всё успешно -> перенаправляем в админку. */
router.post('/', function(req, res, next) {
    const { username, password } = req.body;
    // Check if the username and password are valid
    if (username === 'administrator' && password === 'Using grid markup') {
        // Set session data
        req.session.user = { username };
        // Redirect to main page

        res.send('<script>alert("SUCCESS!"); window.location="/admin";</script>');
    } else {
        res.send('<script>alert("Invalid username or password!"); window.location="/login";</script>');
    }
});

module.exports = router;
