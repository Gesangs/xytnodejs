var express = require('express')
var app = express()
var flash = require('connect-flash')
var session = require('express-session')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var morgan = require('morgan');
var path = require('path');
var port=process.env.PORT || 3000
var env = process.ev.NODE_ENV || 'development'
var dbUrl = 'mongodb://guodong_xyt_runner:F**K9001$@127.0.0.1:19999/guodong';
if(env === 'development') {
    dbUrl = 'mongodb://localhost:27017/guodong';
}
mongoose.connect(dbUrl,{useMongoClient:true});
app.set('views',"./app/view2/pages");
app.set('view engine','jade');
app.listen(port);
console.log('done' + port);
app.use(serveStatic('public'));
app.use(require('connect-multiparty')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'guodong',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	}),
	resave: false,
	saveUninitialized: true,
}))
app.use(flash())
mongoose.Promise = require('bluebird');
app.locals.moment = require('moment')
if('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(morgan(':method :url :status'))
	app.locals.pretty = true;
	mongoose.set('debug', true);
}

require('./config/routes.js')(app)