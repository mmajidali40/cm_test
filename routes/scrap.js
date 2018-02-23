
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
//    var queryPrameters = Object.keys(req.query);
    var address = req.query.address;
    console.log(req.query.value);
    res.send('yes');
});

module.exports = router;