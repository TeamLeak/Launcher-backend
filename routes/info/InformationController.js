const express = require('express');
const router = express.Router();

const informationJSON = require('../../utils/InformationParser');

/* Рендерим саму форму. */
router.get('/', function(req, res, next) {
    res.render('information-admin', { title: 'News Control!', informationJSON });
});

/* POST обрабатываем формочку. */
router.post('/', function(req, res, next) {
    informationJSON.setServerName(req.body.title);
    informationJSON.setVersion(req.body.version);
    informationJSON.setMaxOnline(parseInt(req.body.max_online));
    informationJSON.setTags(req.body.tags.split(/[ ;]/));
    informationJSON.setDescription(req.body.body);

    informationJSON.saveToFile();

    res.send('<script>alert("SUCCESS!"); window.location="/information";</script>');
});

module.exports = router;