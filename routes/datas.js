var express = require('express');
var router = express.Router();

var request = require('request');
var http = require('http');

var $respp = http.get({ host: 'simpleprogrammer.com' }, function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

//console.log( $respp );

var port = 3001;

var app = express();

app.listen(port, function(){
    console.log('Server started on port '+port);
});
