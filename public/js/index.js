var socket = io();

socket.on('connect', function () {
    console.log("connected to server");
});

socket.on('disconnect', function() {
    console.log("disconnected from server");
});

socket.on('newMessage', function(message) {
    console.log("new message:", message);
    var li = jQuery('<li></li>').text(`${message.from} : ${message.text}`)
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>').text(`${message.from} : `);
    var a = jQuery('<a target="_blank">My current location</a>').attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'A user',
        text: jQuery('[name=message]').val()
    }, function(message)  {
        console.log('we got a callback from server', message);
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log('geolocation', position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },
    function (err) {
        alert('Unable to get your location');
    });
});