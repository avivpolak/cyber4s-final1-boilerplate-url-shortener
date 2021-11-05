const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");
const validator = require("validator");

function getUrl(id) {
    //pull out an url with this id
    try {
        let db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
        );
        db[id][2]++; //update counter
        fs.writeFileSync(
            path.resolve(__dirname, "./db/dataBase.json"),
            JSON.stringify(db)
        );

        return db[id][0];
    } catch {
        let err = new Error("this url shourtner doesn't lead anywhere .(YET).");
        err.code = 404;
        throw err;
    }
}
function saveUrl(url, name) {
    //saves up an url , with a uniqe 36-based id.
    try {
        let db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
        );
        valid(url);
        //add valid name here
        let id = Object.entries(db).length + 1;
        db[id.toString(36)] = [url, name, 0]; //that how i save in smaller number, base 36
        fs.writeFileSync(
            path.resolve(__dirname, "./db/dataBase.json"),
            JSON.stringify(db)
        );
        return id.toString(36);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function getListByName(name) {
    //Get the url's of specific user.
    //it returns an array, [[id,url],[id,url],[id,url],[id,url],[id,url]...]

    let db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
    );
    let FileredDb = [];
    for (let url in db) {
        if (db[url][1] === name) {
            FileredDb.push([url, db[url][0]]);
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

module.exports = { getUrl, saveUrl, getListByName, valid };
