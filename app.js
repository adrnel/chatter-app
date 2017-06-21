var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function(){
    console.log("App is listening on port 3000")
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    io.emit('chat message', 'user has joined');
    socket.on('disconnect', function(){
        io.emit('chat message', 'user has left');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});