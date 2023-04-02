const express = require('express');
const router = express.Router();

const informationJSON = require('../../utils/InformationParser')

/* На GET запрос с целью получить новости, возвращаем JSON. */
router.get('/', function(req, res, next) {
    res.json(informationJSON);
});

module.exports = router;