const path = require('path');
const express = require('express');
const http = require('http');

const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New user is connected");
    socket.on('disconnect', () => {
        console.log('page disconnected');
    });

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the Chat App',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined the Chat App',
        createdAt: new Date().getTime()
    });

    socket.on("createMessage", (message) => {
        console.log("incoming message", message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date()
        })
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});