const express = require('express');
const router = express.Router();

/* Обрабатываем GET, сделав logout из сессии. */
router.get('/', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
