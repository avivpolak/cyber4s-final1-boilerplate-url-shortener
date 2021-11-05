const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");
const validator = require("validator");
const db = require("./db/db");
const user = require("./db/user");
function register(userName, password) {
    try {
        let newUser = new user(userName, password);
        let usersDb = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./db/usersDb.json"))
        );
        console.log(usersDb);
        usersDb[newUser.id] = newUser;
        console.log(usersDb);
        fs.writeFileSync(
            path.resolve(__dirname, "./db/usersDb.json"),
            JSON.stringify(usersDb)
        );
        return JSON.stringify(newUser);
    } catch (err) {
        throw err; //make it better error handaling
    }
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
            FileredDb.push([url, db[url].url]);
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

module.exports = { register, getUrl, saveUrl, getListByName, valid };
