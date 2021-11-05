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
apiRouter.put("/users/:userName", (req, res, next) => {
    //get statisticts about my url's
    try {
        helpers.getUser(req.headers.username, req.headers.password);
        let userName = req.params.userName;
        let list = helpers.getListByName(userName);
        res.send(JSON.stringify(list));
    } catch (err) {
        next(err);
    }
});
apiRouter.put("/login", (req, res, next) => {
    // when using the short url
    try {
        let user = helpers.getUser(req.headers.username, req.headers.password); // for a user that is first time in the systrm it throw an error
        res.status(200);
        res.send(JSON.stringify(user));
    } catch (err) {
        next(err);
    }
});

apiRouter.post("/users/new", (req, res, next) => {
    //set a new url sortener

    try {
        let newUser = helpers.register(
            req.headers.username,
            req.headers.password
        );
        res.send(newUser);
    } catch (err) {
        next(err);
    }
});

apiRouter.post("/new", (req, res, next) => {
    //set a new url sortener
    try {
        let name = "";
        if (req.headers.name === "undefined") {
            name = "53c5ff7f-16b1-4216-b47c-fe8c1978e9f";
        } else {
            name = req.headers.name;
        }
        let newUrl = helpers.saveUrl(req.headers.url, name);
        res.send(`http://localhost:1042/api/${newUrl}`);
    } catch (err) {
        next(err);
    }
});

module.exports = apiRouter;
