var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var animal = require('./routes/animal');
var animal_type = require('./routes/animal_type');

var app = express();

// view engine setup
app.engine("html",require("express-art-template"));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// 访问首页
app.get('/', function(req, res) {
    res.redirect("/admin/animal/index.html");
});
app.use('/api/v1/animals', animal);
app.use('/api/v1/animal_types', animal_type);

app.listen(3002,function(){
    console.log('listen on 3002...')
})
module.exports = app;