var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var api_init_ejemplo = require('./routes/api');
var api_init_usuarios = require('./routes/api/users');
var api_init_card = require('./routes/api/cards');
var api_init_censo = require('./routes/api/censo');
function app_init(db){
  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(require('less-middleware')(path.join(__dirname, 'public')));

  app.use(cors());
  app.options('*', cors());

  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', index);
  app.use('/users', users);
  app.use('/api/ejemplo', api_init_ejemplo(db));
  app.use('/api/usuarios',api_init_usuarios(db));
  app.use('/api/cards', api_init_card(db));
  app.use('/api/censo', api_init_censo(db));
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

  return app;
} // app_init

module.exports = app_init;
