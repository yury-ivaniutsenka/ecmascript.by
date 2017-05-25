var path = require('path');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require("connect-flash");

module.exports = function (app) {
// view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');


// app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(session({
        secret: 'jhg5h3g5jg5g5rkg543j2534hj5',
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());
};