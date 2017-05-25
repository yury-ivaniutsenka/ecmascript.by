var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

module.exports = function (app) {
    // app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, '../public')));
};