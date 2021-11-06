const app = require("./app");
const PORT = process.env.PORT || 1042;
app.use(function (err, req, res, next) {
    // if (!err.code) { ///uncomment on production
    //     err.message = "server error";
    // }
    res.status(err.code || 500).send(`${err.code || 500} | ${err.message}`);
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
