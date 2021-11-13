/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const apiRouter = require("./routers/apiRouter");
const app = express();

app.use(cors());
app.use("/", express.static(path.join(__dirname, "/views/dist"))); // serve main path as static dir
app.get("/", function (req, res) {
  // serve main path as static file
  res.sendFile(path.join(__dirname, "/views/dist/index.html"));
});
app.use("/public", express.static(`./public`));
app.use("", apiRouter);

module.exports = app;
