const expect = require('expect');

const {generateMessage} = require('./utils/message');

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