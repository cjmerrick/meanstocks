var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var favicon = require('serve-favicon');

var index = require('./routes/index');
var stocks = require('./routes/stocks');

var port = 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));
//app.use(favicon(__dirname + '/client/images/money-favicon.ico'));
//app.use('/money-favicon.ico', express.static('images/money-favicon.ico'));


// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', stocks);
//app.use('/data', data);

app.listen(port, function(){
    console.log('Server started on port '+port);
});
