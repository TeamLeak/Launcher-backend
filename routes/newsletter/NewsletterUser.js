const express = require('express');
const router = express.Router();

const newsJSON = require('../../utils/NewsletterParser')

/* На GET запрос с целью получить новости, возвращаем JSON. */
router.get('/', function(req, res, next) {
    res.json(newsJSON);
});

module.exports = router;