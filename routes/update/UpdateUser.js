const express = require('express');
const router = express.Router();

const updatesJSON = require('../../utils/UpdatesJson')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json(updatesJSON);

});

module.exports = router;
