require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRouter = require("./routers/apiRouter");
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
