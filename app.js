
/**
 * Module dependencies.
 */
var flash    = require('connect-flash');
var express = require('express');
var passport = require('passport');

var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var https = require('https');
var fs = require('fs')
var path = require('path');
var controller=require('./controllers/controller.js')


var credentials = {
  key: fs.readFileSync('secure/key.pem'),
  cert: fs.readFileSync('secure/cert.pem')
};

var app = express()
// all environments
app.set('port', process.env.PORT || 3000);
app.set('Sport', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(flash());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));


app.use(express.static(path.join(__dirname, '/public')));
app.use("/img", express.static(__dirname + '/public/images'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/css", express.static(__dirname + '/public/stylesheets'));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/home',routes.home);
app.get('/userlist',routes.userlist(db))


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

https.createServer(credentials,app).listen(app.get('Sport'), function(){
  console.log('Express server listening on port ' + app.get('Sport'));
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
  app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	 // use connect-flash for flash messages stored in session

	require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport
