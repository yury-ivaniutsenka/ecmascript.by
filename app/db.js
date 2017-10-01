var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/site');
mongoose.Promise = global.Promise;


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('open');
});




