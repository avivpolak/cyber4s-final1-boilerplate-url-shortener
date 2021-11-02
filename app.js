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
    res.setHeader("location", getUrl(req.params.id));
    res.status(301);
    res.send("redirect");
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
app.post("/new", (req, res) => {
    let newUrl = saveUrl(req.headers.url);

    res.send(`http://localhost:1024/api/${newUrl}`);
});

module.exports = app;

function getUrl(id) {
    let db = fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"));
    return JSON.parse(db)[id];
}
function saveUrl(url) {
    let db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"))
    );
    db[getNewId()] = url;
    fs.writeFileSync(
        path.resolve(__dirname, "./db/dataBase.json"),
        JSON.stringify(db)
    );
    return getNewId();
}

function getNewId() {
    return 43;
}
function numToHash(id) {
    return id.toString(36);
}

console.log(numToHash(239542903878));
