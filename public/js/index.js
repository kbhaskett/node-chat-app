var socket = io();

socket.on('connect', function () {
    console.log("connected to server");
});

socket.on('disconnect', function() {
    console.log("disconnected from server");
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>').text(`${message.from} : ${formattedTime} : ${message.text}`)
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>').text(`${message.from} : ${formattedTime} : `);
    var a = jQuery('<a target="_blank">My current location</a>').attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    var messageTextbox = jQuery('[name=message]');
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'A user',
        text: messageTextbox.val()
    }, function(message)  {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending ...');
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log('geolocation', position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    },
    function (err) {
        alert('Unable to get your location');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});