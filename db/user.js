let uuid = require("uuid");
class user {
    id;
    userName;
    password;
    //i need to choose between getting the user from url shourt or gettin the urls of a user , seemes like the 2nd is better
    constructor(userName, password) {
        this.id = uuid.v4();
        this.userName = userName;
        this.password = password;
    }
    get id() {
        return this.id;
    }
    get userName() {
        return this.userName;
    }
    get password() {
        return this.password;
    }
    set id(id) {
        this.id = id;
    }
    set userName(userName) {
        this.userName = userName;
    }
    set password(password) {
        this.password = password;
    }
}
module.exports = user;
