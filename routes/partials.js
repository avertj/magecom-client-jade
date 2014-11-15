var express = require('express');
var url = require('url');
var router = express.Router();

/* GET users listing. */
router.get(/.\.html/, function(req, res) {
    res.render('partials' + req.url.split('.')[0]);
});

module.exports = router;
