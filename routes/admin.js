var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/User');
var flash = require("connect-flash");


router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.render('admin', {users: users});
    });
});

router.get('/user/:id', function (req, res, next) {
    User.findOne({'_id': req.params.id}, function (err, user) {
        if (err) user = {};
        res.render('user', {flash : req.flash('error'), user: user});
    });
});

router.post('/user/save/:id', function (req, res, next) {

    if (req.body.password.length === 0) {
        req.flash('error', 'Password can\'t be empty.');
        return res.redirect('/admin/user/' + req.params.id);
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return next(err);

            User.findOne({'_id': req.params.id}, function (err, user) {
                if (err) {
                    var newUser = new User({
                        email: req.body.email,
                        password: hash
                    });
                    newUser.save(function (err, user) {
                        if (err) return next(err);
                        return res.redirect('/admin');
                    });
                } else {
                    user.email = req.body.email;
                    user.password = hash;
                    user.save(function (err, user) {
                        if (err) return next(err);
                        return res.redirect('/admin');
                    });
                }
            });
        });
    });




});

router.get('/user/delete/:id', function (req, res, next) {
    User.findOne({'_id': req.params.id}, function (err, user) {
        if (err) return next(err);
        user.remove();
        return res.redirect('/admin');
    });
});

module.exports = router;
