const expect = require('expect');

const {Users} = require('../../utils/users');

describe('Users', () => {
    beforeEach(() => {
        users = new Users();
        users.addUser('123ABC', 'Joe', 'Room A');
        users.addUser('3422ADf', 'Mike', 'Room B');
        users.addUser('1C2B3', 'Sam', 'Room A');
    });

    it('should add a new user', () => {
        var user = {
            id: 'abc1234',
            name: 'Joe',
            room: 'MASH'
        }
        var retUser = users.addUser(user.id, user.name, user.room);
        expect(retUser).toEqual(user);
        expect(users.users).toContainEqual(user);
    });

    it('should return names for a room', () => {
        expect(users.getUserList('Room A')).toEqual(['Joe', 'Sam']);
        expect(users.getUserList('Room B')).toEqual(['Mike']);
    });

    it('should return the correct user for an id', () => {
        expect(users.getUser('3422ADf')).toEqual({
            id: '3422ADf',
            name: 'Mike',
            room: 'Room B'
        });
    });

    it('should return empty array for an bad id', () => {
        expect(users.getUser('XAASDF')).toBeFalsy();
    });

    it('should return the correct user for a removed id', () => {
        expect(users.removeUser('3422ADf')).toEqual({
            id: '3422ADf',
            name: 'Mike',
            room: 'Room B'
        });
        expect(users.users.length).toBe(2);
    });
});