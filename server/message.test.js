const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./utils/message');

describe('Generate message', () => {
    it('should generate correct message object', () => {
        var from = 'Admin';
        var text = 'This is the text';
        var message = generateMessage(from, text);
        expect(message).toBeTruthy();
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('Generate location message', () => {
    it('should generate a correct location message object', () => {
        var from = 'Andy';
        var latitude = 123.456;
        var longitude = 45.678;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message).toBeTruthy();
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});