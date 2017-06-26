var socket = io();
$('#chat-form').submit(function(){
    socket.emit('chat message', $('#message-box').val());
    $('#message-box').val('');
    return false;
});
$('#username-form').submit(function(){
    socket.emit('user check request', $('#username-box').val());
    return false;
});
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg[0]+": "+msg[1]));
    var element = document.getElementById("messages-container");
    element.scrollTop = element.scrollHeight;
});
socket.on('join message', function(msg){
    $('#messages').append($('<li class="join">').text(msg));
    var element = document.getElementById("messages-container");
    element.scrollTop = element.scrollHeight;
});
socket.on('leave message', function(msg){
    $('#messages').append($('<li class="leave">').text(msg));
    var element = document.getElementById("messages-container");
    element.scrollTop = element.scrollHeight;
});
socket.on('refresh users', function(users){
    $('#users').empty();
    for (var i = 0; i < users.length; i++){
        $('#users').append($('<li>').text(users[i].name));
    }
});socket.on('username', function(username){
    $('#username').text(username);
});
socket.on('user check response', function(code){
    switch(code) {
        case 1:
            $("#error").text("Please enter a Username");
            break;
        case 2:
            $("#error").text("Username already exists");
            break;
        default:
            $('#username-form').addClass("hide");
            $('#chat-app').removeClass("hide");
    }
});
