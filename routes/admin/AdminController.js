const express = require('express');
const router = express.Router();

/* Возвращаем admin-панель. */
router.get('/', function(req, res, next) {
    res.render('admin/admin', { title: 'Admin Panel!' });
});

module.exports = router;
