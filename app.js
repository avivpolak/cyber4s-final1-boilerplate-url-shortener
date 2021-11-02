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
app.post("/api/shorturl/new", (req, res) => {
    //res.send("url");

    res.sendFile(__dirname + "/views/new.html");
});

module.exports = app;
function getUrl(id) {
    let db = fs.readFileSync(path.resolve(__dirname, "./db/dataBase.json"));
    return JSON.parse(db)[id];
}
