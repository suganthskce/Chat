const express = require('express');
const app = express();

// setting template engine ejs
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

//routes
app.get('/',(req,res) => {
    res.render('index');
    //res.send("Hello world");
});

//Listen to port
server = app.listen(3000 , "0.0.0.0", (error) => {
    console.log("App started at port -> 8080");
    if(error) {
        console.log("Error -> ",error);
    }
});

//socket.io instantiation
const io = require('socket.io')(server);

//listen to all connection
io.on('connection', (socket) => {
    console.log("New User Connected");

    //default username
    socket.username = "Anonymous";

    //listen to change in username
    socket.on('change_username',(data)=>{
        console.log("Username=->",data.username);
        socket.username = data.username;
    });

    //listen to new message
    socket.on('new_message', (data) => {
        //broadcast new message
        io.sockets.emit('new_message',{message: data.message,username: socket.username});
    });
});