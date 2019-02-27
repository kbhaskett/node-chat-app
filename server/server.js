const path = require('path');
const express = require('express');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log("New user is connected");
    socket.on('disconnect', () => {
        console.log('page disconnected');
    });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and Room name must be provided');
        }
        
        socket.join(params.room.trim());
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

        socket.broadcast.to(params.room.trim()).emit('newMessage', generateMessage('Admin', `${params.name.trim()} has joined`));
        callback();
    });

    socket.on("createMessage", (message, callback) => {
        console.log("incoming message", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback({text: 'message is good', from: 'Admin'});
    });

    socket.on("createLocationMessage", (message) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', message.latitude, message.longitude));
        //callback({text: 'message is good', from: 'Admin'});
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});