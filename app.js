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
        console.log("ID of person joined: ", socket.id);
        var isError = false;
        if (!username){
            io.emit('user check response', 1);
            isError = true;
        }
        console.log(username);
        for (var i = 0; i < users.length; i++){
            if (users[i].name === username) {
                console.log("users[i].name", users[i].name);
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
            io.emit('chat message', username+' has joined');
            io.emit('refresh users', users);
        }
    });
   console.log("clients: ", Object.keys(io.engine.clients));

    socket.on('disconnect', function(){
        var index = 0;
        for (var i = 0; i < users.length; i++){
            if (users[i].id === socket.id) {
                index = i;
            }
        }
        if(index){
            io.emit('chat message', users[index].name+' has left');
            users.splice(index, 1);
            io.emit('refresh users', users);
        }
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});