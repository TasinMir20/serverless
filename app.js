const serverless = require("serverless-http");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const databaseConnection = require("./config/database");
const rootRouter = require("./routes/index");

const app = express();

// Middleware Array
const middleware = [logger("dev"), cors(), express.static("public"), express.urlencoded({ extended: true }), express.json(), cookieParser()];
app.use(middleware);
console.clear();

app.use(rootRouter);

// Database
databaseConnection();

exports.handler = serverless(app);
