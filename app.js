var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var openAiRouter = require("./routes/openai");
var restaurantRouter = require("./routes/restaurant");
var agentRouter = require("./routes/agent");
const { displayApiKey, langChainCode, generateText } = require("./openai/openai");
// console.log(generateText("Sachin Tendulkar"));
// const openAi = require("./openai/openai2");

// langchain tuts

// const langChain = require("./langchain/langchain");
// const langChainMemory = require("./langchain/memory");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/openai", openAiRouter);
app.use("/restaurant", restaurantRouter);
app.use("/agent", agentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
