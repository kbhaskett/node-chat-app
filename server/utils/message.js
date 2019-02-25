var generateMessage = (sender, text) => {
return {
    from: sender,
    text: text,
    createdAt: new Date().getTime()
    }
};

module.exports = {generateMessage};