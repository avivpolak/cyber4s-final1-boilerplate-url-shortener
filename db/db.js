class db {
    url;
    user;
    timesVisited;
    constructor(url, user) {
        this.url = url;
        this.user = user;
        this.timesVisited = 0;
    }
    get url() {
        return this.url;
    }
    get user() {
        return this.user;
    }
    get timesVisited() {
        return this.timesVisited;
    }
    set url(url) {
        this.url = url;
    }
    set user(user) {
        this.user = user;
    }
}
module.exports = db;
