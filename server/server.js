const path = require('path');
const express = require('express');
const http = require('http');

const {generateMessage} = require('./utils/message');

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

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the Chat App'));

    socket.on("createMessage", (message, callback) => {
        console.log("incoming message", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback({text: 'message is good', from: 'Admin'});
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});