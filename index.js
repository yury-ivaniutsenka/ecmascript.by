var express = require('express');
var path = require('path');
var app = express();

//require('./app/db');
require('./app/init')(app);
require('./app/static')(app);
require('./app/authenticate')(app);
require('./app/router')(app);
require('./app/404')(app);
require('./app/error_handler')(app);

app.listen(80);