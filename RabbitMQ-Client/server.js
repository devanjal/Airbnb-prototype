var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var compression = require('compression');
// var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var session = require('express-session');
var http = require('http');

var users = require('./routes/users');
var profile=require('./routes/profile');
var bill=require('./routes/bill');

var app = express();

app.use(session({
  secret: 'kotia_just_chill',
  resave: true,
  saveUninitialized: true
}));
app.use(compression());
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(favicon(__dirname + '/public/airbnb-favicon.ico'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(serveStatic(__dirname + '/public', { 'maxAge': '1d' }));

//app.use(serveStatic(path.join(__dirname, 'views')));

app.use(serveStatic(path.join(__dirname, 'angularApp')));
app.use('/users', users);
app.get('/profile',profile.profile);
app.get('/viewProfile',profile.viewProfile);
app.get('/checkProfile',profile.checkProfile);
app.get('/getProfile',profile.getProfile);
app.post('/getBill',bill.getBill);
app.post('/profile',profile.setProfile);
app.post('/billGen',bill.bill_gen);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.all('/*', function (req, res, next) {
  console.log(req.url);
  res.sendFile('views/index.html', { root: __dirname });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});