const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");
const validator = require("validator");
const db = require("./db/db");
const user = require("./db/user");
function register(userName, password) {
    try {
        let usersDb = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./db/usersDb.json"))
        );
        validUser(userName, password);
        usersDb[userName] = password;
        fs.writeFileSync(
            path.resolve(__dirname, "./db/usersDb.json"),
            JSON.stringify(usersDb)
        );
        return JSON.stringify({ userName: userName, password: password });
    } catch (err) {
        throw err; //make it better error handaling
    }
}
function validUser(userName, password) {
    let usersDb = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./db/usersDb.json"))
    );
    if (!usersDb.hasOwnProperty(userName)) {
        if (validator.isStrongPassword(password)) {
            return;
        }
        let err = new Error(
            "your password is week: you need at least 1 lower cased letter and upper casaed, min length is 8 chars, one symbol and one number."
        );
        err.code = 400;
        throw err;
    }
    let err = new Error(
        "this name is all ready exsist :( , try something else...."
    );
    err.code = 400;
    throw err;
}
function getUser(username, password) {
    let usersDb = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./db/usersDb.json"))
    );
    if (usersDb.hasOwnProperty(username)) {
        if (usersDb[username] === password) {
            return { name: username, password: password };
        }
        let err = new Error(
            "this is not you password... try this tips: http://localhost:1042/api/q"
        );
        err.code = 400;
        throw err;
    }
    let err = new Error("sorry , but we have no such username in our system");
    err.code = 404;
    throw err;
}

function getUrl(id) {
    //pull out an url with this id
    try {
        let dataBase = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
        );
        dataBase[id].timesVisited++;
        fs.writeFileSync(
            path.resolve(__dirname, "./db/dataBase.json"),
            JSON.stringify(dataBase)
        );

        return dataBase[id].url;
    } catch {
        let err = new Error("this url shourtner doesn't lead anywhere .(YET).");
        err.code = 404;
        throw err;
    }
}
function saveUrl(url, name) {
    //saves up an url , with a uniqe 36-based id.
    try {
        let dataBase = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
        );
        valid(url);
        //add valid name here
        let id = Object.entries(dataBase).length + 1;
        let newUrlObj = new db(url, name);
        dataBase[id.toString(36)] = newUrlObj; //that how i save in smaller number, base 36
        fs.writeFileSync(
            path.resolve(__dirname, "./db/dataBase.json"),
            JSON.stringify(dataBase)
        );
        return id.toString(36);
    } catch (err) {
        throw err;
    }
}

function getListByName(id) {
    //Get the url's of specific user.
    //it returns an array, [[id,url],[id,url],[id,url],[id,url],[id,url]...]

    let db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
    );
    let FileredDb = [];
    for (let url in db) {
        if (db[url].user === id) {
            FileredDb.push([
                `http://localhost:1042/api/${url}`,
                db[url].url,
                db[url].timesVisited,
            ]);
        }
    }
    return FileredDb;
}
function valid(url) {
    if (url.length < 200) {
        if (validator.isURL(url) && url.length < 200) {
            if (url.startsWith("http://") || url.startsWith("https://")) {
                //becouse validator dosn't check
                return;
            }
            let err = new Error("The url nust start with http:// or https://");
            err.code = 400;
            throw err;
        }
        let err = new Error("This url is not valid");
        err.code = 400;
        throw err;
    }
    let err = new Error("The url must be shourter then 200 chars.");
    err.code = 400;
    throw err;
}
function saveSpesiphicUrl(url, name, str) {
    //saves up an url , with a spesiphic name.
    try {
        let dataBase = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
        );
        valid(url);
        sreachIfExsist(str);
        let newUrlObj = new db(url, name);
        dataBase[str] = newUrlObj;
        fs.writeFileSync(
            path.resolve(__dirname, "./db/dataBase.json"),
            JSON.stringify(dataBase)
        );
        return str;
    } catch (err) {
        throw err;
    }
}

function sreachIfExsist(str) {
    try {
        let dataBase = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
        );
        for (let url of Object.entries(dataBase)) {
            if (url[0] === str) {
                let err = new Error("This url is taken aleady");
                err.code = 400;
                throw err;
            }
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getUser,
    register,
    getUrl,
    saveUrl,
    saveSpesiphicUrl,
    getListByName,
    valid,
};
