var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');
const passport = require('passport');
const fileUpload = require('express-fileupload');

require("./config/database.config");

// var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

app.use(passport.initialize());
require('./config/validation/passport')(passport);

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.use('/', indexRouter);
app.use('/', blogRouter);
app.use('/', userRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});

module.exports = app;
