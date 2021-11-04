require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");
const validator = require("validator");
const app = express();

app.use(cors());
app.use("/public", express.static(`./public`));

app.get("/api/:id", (req, res) => {
    //when using the short url
    res.setHeader("location", getUrl(req.params.id));
    res.status(301);
    res.send("redirect"); //add an loader page
});

app.get("/", (req, res) => {
    //getting to the main page of my site

    res.sendFile(__dirname + "/views/index.html"); //will be the front
});
app.get("/users/:userName", (req, res) => {
    //get statisticts about my url's

    let userName = req.params.userName;
    let list = getListByName(userName);
    res.send(JSON.stringify(list));
});

app.post("/new", (req, res) => {
    //set a new url sortener

    let newUrl = saveUrl(req.headers.url, req.headers.name);
    if (newUrl) {
        res.send(`http://localhost:1041/api/${newUrl}`);
    } else {
        res.send("problem occourd"); //handle better!
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\FUNCTIONS//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getUrl(id) {
    //pull out an url with this id

    let db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
    );
    db[id][2]++; //update counter
    fs.writeFileSync(
        path.resolve(__dirname, "./db/dataBase.json"),
        JSON.stringify(db)
    );

    return db[id][0];
}
function saveUrl(url, name) {
    //saves up an url , with a uniqe 36-based id.

    let db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
    );
    if (!valid(url)) return; //handle error:url not good
    let id = Object.entries(db).length + 1;
    db[id.toString(36)] = [url, name, 0]; //that how i save in smaller number, base 36
    fs.writeFileSync(
        path.resolve(__dirname, "./db/dataBase.json"),
        JSON.stringify(db)
    );
    return id.toString(36);
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
    if (validator.isURL(url) && url.length < 200) {
        if (url.startsWith("http://") || url.startsWith("https://")) {
            //becouse validator dosnt check
            return true;
        }
    }
    return false;
}

module.exports = app;
