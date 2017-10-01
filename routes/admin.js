var express = require('express');
var router = express.Router();
const crypto = require('crypto');
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
    res.render('user', {flash: req.flash('error'), user: user});
  });
});

router.post('/user/save/:id', function (req, res, next) {

  if (req.body.password.length === 0) {
    req.flash('error', 'Password can\'t be empty.');
    return res.redirect('/admin/user/' + req.params.id);
  }

  crypto.pbkdf2(req.body.password, 'salt', 100000, 512, 'sha512', function (err, derivedKey) {
    if (err) return next(err);

    const hash = derivedKey.toString('hex');

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
      }
      else {
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

router.get('/user/delete/:id', function (req, res, next) {
  User.findOne({'_id': req.params.id}, function (err, user) {
    if (err) return next(err);
    user.remove();
    return res.redirect('/admin');
  });
});

module.exports = router;
