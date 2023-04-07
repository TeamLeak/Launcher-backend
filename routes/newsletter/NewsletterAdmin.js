const express = require('express');
const router = express.Router();

const newsJSON = require('../../utils/NewsletterParser')

/* Рендерим саму форму. */
router.get('/', function(req, res, next) {
    res.render('admin/news-admin', { title: 'News Control!' });
});

/* POST обрабатываем формочку. */
router.post('/', function(req, res, next) {
    const title = req.body.title;
    const date = req.body.date;
    const tags = req.body.tags.split(/[ ,;]+/); // split tags into an array
    const body = req.body.body;

    newsJSON.addNewsToTop(title, date, tags, body);

    res.send('<script>alert("SUCCESS!"); window.location="/newsletter";</script>');
});

module.exports = router;