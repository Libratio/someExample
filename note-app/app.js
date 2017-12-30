var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var note_folder = require('./routes/note_folder');
var note = require('./routes/note');

var app = express();

// view engine setup
app.engine('html', require("express-art-template"));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/note_folder', note_folder);
app.use('/note', note);

app.get('/', function(req, res) {
  res.redirect('/note_folder');
});

app.listen(3000,function(){
  console.log("服务器运行在3000端口...");
})
