//where all request comes
//whenever anything is installed it is fetched here using require
//and connection is set up

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session=require('express-session');//for signup
var passport=require('passport');
var flash=require('connect-flash');

var indexRouter = require('./routes/index');

var app = express();
mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser:true});
require('./config/passport');

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'mysupersecret',resave:false,saveUninitialized:false}));//for signup
app.use(flash());//flash
app.use(passport.initialize());//passport
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
