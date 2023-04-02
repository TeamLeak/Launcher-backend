const express = require('express');
const updatesJSON = require("../../utils/UpdatesJson");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('update-admin', { title: 'Update Control' });
});

/* POST обрабатываем формочку. */
router.post('/', function(req, res, next) {
    const body = req.body.body;

    updatesJSON.saveToFile(body);

    res.send('<script>alert("SUCCESS!"); window.location="/updates";</script>');
});


module.exports = router;
