var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var blogs = require('./routes/blogs');

var app = express();

app.engine('html', require("express-art-template"));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', index);
app.use('/api/v1/blogs', blogs);
app.use("/api/v1/upload",require('./routes/upload'));

app.get('/', function(req, res) {
  res.redirect("/api/v1/list/0");
});

app.listen(3001,function(){
  console.log('listen on 3001..')
})
module.exports = app;
