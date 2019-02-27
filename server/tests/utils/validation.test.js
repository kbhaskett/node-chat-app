const expect = require('expect');

const {isRealString} = require('../../utils/validation');

describe('isRealString', () =>{
    it('should return false if non string passed', ()=> {
        var str = 123;
        expect(isRealString(str)).toBe(false);
    });

    it('should return false if blank string is passed', ()=> {
        var str = '      ';
        expect(isRealString(str)).toBe(false);
    });

    it('should return true if good string passed', ()=> {
        var str = 'asdasdfasdf';
        expect(isRealString(str)).toBe(true);
    });
});