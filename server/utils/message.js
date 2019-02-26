var generateMessage = (sender, text) => {
return {
    from: sender,
    text: text,
    createdAt: new Date().getTime()
    }
};

var generateLocationMessage = (sender, latitude, longitude) => {
    return {
        from: sender,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
};
module.exports = {generateMessage, generateLocationMessage};