const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

var index = require('./routes/index');
var register = require('./routes/register');
var admin = require('./routes/admin');

var app = express();

var db = mongoose.connection;
db.on('error', console.error);
db.on('open', () => {
  console.log("DB connected");
});````
mongoose.connect('mongodb://localhost/sdatabase');
mongoose.connect('mongodb://localhost/dbuser');
mongoose.connect('mongodb://localhost/dbadmin');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'SessioN!@!NoisseS',
  resave: false,
  saveUninitialized: true
}));

app.use('/', index);
app.use('/register', register);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
