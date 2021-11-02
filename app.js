require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/public", express.static(`./public`));

app.get("/api/:id", (req, res) => {
    res.setHeader("location", getUrl(req.params.id));
    res.status(301);
    res.send("redirect?");
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
function getUrl(id) {
    return `https://www.${id}.com`;
}
