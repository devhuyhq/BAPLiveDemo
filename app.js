
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var express = require('express');

var app = express();
const BAPLive = require('baplive');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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


const server = app.listen(4000);
const io = require('socket.io').listen(server, {pingTimeout: 30000});
// BAPLive.default.init('mongodb://localhost:27017/baplivedemo', io, null, 'baplivedemo', 'rtmp://171.244.21.78/live');
BAPLive.default.init('mongodb://stream:SOh3Pxmt1oTbYhx8ypJOfL@mongodb1:27017,mongodb2:27017/stream?replicaSet=rs0', io, null, 'baplivedemo', 'rtmp://171.244.21.78/live');
