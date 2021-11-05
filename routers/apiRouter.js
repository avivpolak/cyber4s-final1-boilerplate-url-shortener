const helpers = require("../helpers");
const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/api/:id", (req, res, next) => {
    //when using the short url
    try {
        res.setHeader("location", helpers.getUrl(req.params.id));
        res.status(301);
        res.send("redirect"); //add an loader page
    } catch (err) {
        next(err);
    }
});
apiRouter.get("/users/:userName", (req, res, next) => {
    //get statisticts about my url's
    try {
        let userName = req.params.userName;
        let list = helpers.getListByName(userName);
        res.send(JSON.stringify(list));
    } catch (err) {
        next(err);
    }
});
apiRouter.post("/users/new", (req, res, next) => {
    //set a new url sortener

    try {
        let newUrl = helpers.register(
            req.headers.username,
            req.headers.password
        );
        res.send(newUrl);
    } catch (err) {
        next(err);
    }
});

apiRouter.post("/new", (req, res, next) => {
    //set a new url sortener
    try {
        let newUrl = helpers.saveUrl(req.headers.url, req.headers.name);
        res.send(`http://localhost:1041/api/${newUrl}`);
    } catch (err) {
        next(err);
    }
});

module.exports = apiRouter;
