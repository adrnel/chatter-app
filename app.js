var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var users = [];

server.listen(3000, function(){
    console.log("App is listening on port 3000")
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('user check request', function(username){
        var isError = false;
        if (!username){
            io.emit('user check response', 1);
            isError = true;
        }
        for (var i = 0; i < users.length; i++){
            if (users[i].name === username) {
                io.emit('user check response', 2);
                isError = true;
            }
        }
        if (!isError){
            users.push({
                id:socket.id,
                name:username
            });

            io.emit('user check response', 3);
            io.emit('join message', username+' has joined');
            io.emit('refresh users', users);
            io.emit('username', username);
        }
    });
    socket.on('disconnect', function(){
        var index = 0;
        for (var i = 0; i < users.length; i++){
            if (users[i].id === socket.id) {
                index = i;
            }
        }
        if(index){
            io.emit('leave message', users[index].name+' has left');
            users.splice(index, 1);
            io.emit('refresh users', users);
        }
    });
    socket.on('chat message', function(msg){
        var index = 0;
        for (var i = 0; i < users.length; i++){
            if (users[i].id === socket.id) {
                index = i;
            }
        }
        io.emit('chat message', [users[index].name, msg]);
    });
});