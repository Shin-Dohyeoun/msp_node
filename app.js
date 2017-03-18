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
server.listen(80);


var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
    socket.emit('toclient',{msg:'Welcome !'});
    socket.on('fromclient',function(data){
        socket.broadcast.emit('toclient',data); // 자신을 제외하고 다른 클라이언트에게 보냄
        socket.emit('toclient',data); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
        console.log('Message from client :'+data.msg);
    })
});
