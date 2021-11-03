"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");
const app = express();

app.use(cors());
app.use("/public", express.static(`./public`));

app.get("/api/:id", (req, res) => {
    //when using the short url
    //res.sendFile(__dirname + "/views/waiting.html");
    console.log(req.params.id);
    res.setHeader("location", getUrl(req.params.id));
    res.status(301);
    res.send("redirect");
});

app.get("/", (req, res) => {
    //getting to the main page of my site

    res.sendFile(__dirname + "/views/index.html");
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
    console.log(req.headers.url, req.headers.name);
    res.send(`http://localhost:1039/api/${newUrl}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\FUNCTIONS//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getUrl(id) {
    //pull out an url with this id

    let db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
    );
    console.log(db[id]);
    //db[id][2]++;
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
module.exports = app;
