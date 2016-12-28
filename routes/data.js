var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/data', function(req, res, next) {
  request({
    uri: 'http://finance.google.com/finance/info?client=ig&q=AAPL'
  }).pipe(res);
});

module.exports = router;
