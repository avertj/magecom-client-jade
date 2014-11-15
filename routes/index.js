var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get(/.\.html/, function(req, res) {
    res.render(req.url.substr(1).split('.')[0]);
});

module.exports = router;
