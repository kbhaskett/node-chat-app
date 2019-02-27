class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        console.log('before', this.users);
        console.log('adding user', user);
        this.users.push(user);
        console.log('After users', this.users);
        return user;
    }

    removeUser(id) {
        console.log('remove user', id);
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var userList = this.users.filter((user) => user.room === room);
        return userList.map((user) => user.name);
    }
}

module.exports = {Users};