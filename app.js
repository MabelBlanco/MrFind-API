var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const errorResponser = require("./modules/errorResponseConfigure");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const playApiRouter = require("./routes/api/play");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.title = "MrFind";

require("./modules/mongooseConection");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Rutas del API
 */
app.use("/api/play", playApiRouter);

/**
 * Rutas del Website
 */

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const response = errorResponser(err, req, res);
  res.status(response.status).json(response);
});

module.exports = app;
