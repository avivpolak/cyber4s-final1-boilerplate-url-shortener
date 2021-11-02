require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/public", express.static(`./public`));

app.get("/api", (req, res) => {
    res.setHeader(
        "location",
        "https://stackoverflow.com/questions/40840852/difference-between-res-setheader-and-res-header-in-node-js"
    );

    res.status(301);
    res.send("redirect?");
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
