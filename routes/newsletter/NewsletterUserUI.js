const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    // Read the news JSON from disk
    const newsPath = __dirname + '/../../public/news.json'
    const newsData = fs.readFileSync(newsPath);
    const news = JSON.parse(newsData);

    res.render('newsletterUI', { news: news.news });
});

module.exports = router;
