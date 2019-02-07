$(function () {
    //var socket = io.connect('http://192.168.22.249:8080');
    var socket = io.connect('http://18.191.217.65:8080');
    //var socket = io.connect('http://localhost:8080');
console.log("Scritp loaded");
    // buttons and inputs
    var message = $("#message");
    var username= $("#username");
    var send_username = $("#send_username");
    var send_message = $("#send_message");
    var chatroom = $("#chatroom");

    //Send Username
    send_username.click(function () {
        console.log("Username",username.val());
        socket.emit('change_username',{username:username.val()});
    });

     //Send Message
     send_message.click(function () {
        console.log("Message",message.val());
        socket.emit('new_message',{message:message.val()});
        message.val("");
    });

    //Listen Message
    socket.on("new_message", (data) => {
        console.log("Recieved message",data);
        chatroom.prepend('<p class = "message">' + data.username + ': ' + data.message + '</p>');
    });
})