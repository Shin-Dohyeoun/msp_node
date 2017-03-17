var http = require('http');
var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middle setup
app.use('/public',express.static(path.join(__dirname, 'public')));


//route setup
var index = require('./routes/index');
var chat = require('./routes/chat');
app.use('/', index);
app.use('/chat', chat);

var server = http.createServer(app);
server.listen(3000);
