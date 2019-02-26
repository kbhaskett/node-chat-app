const moment = require('moment');

var generateMessage = (sender, text) => {
return {
    from: sender,
    text: text,
    createdAt: moment().valueOf()
    }
};

var generateLocationMessage = (sender, latitude, longitude) => {
    return {
        from: sender,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
};
module.exports = {generateMessage, generateLocationMessage};