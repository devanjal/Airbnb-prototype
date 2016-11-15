var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var compression = require('compression');

var expressSession = require('express-session');

var app = express();

app.use(compression());

app.set('port', process.env.PORT || 80);

app.use(logger('dev'));
app.use(favicon(__dirname + '/public/airbnb-favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(serveStatic(__dirname + '/public', { 'maxAge': '1d' }));

app.use(serveStatic(path.join(__dirname, 'views')));

app.use(serveStatic(path.join(__dirname, 'angularApp')));

app.all('/*', function (req, res, next) {
  console.log(req.url);
  res.sendFile('views/index.html', { root: __dirname });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});