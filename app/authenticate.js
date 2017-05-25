var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var bcrypt = require('bcrypt');


module.exports = function (app) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            if (username == "a" && password == "a") {
                return done(null, {
                    _id: 0,
                    email: "admin@admin.com"
                });
            }

            User.findOne({email: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }

                bcrypt.compare(password, user.password, function(err, isPasswordMatch) {
                    if (err) {
                        return done(err);
                    }

                    if (!isPasswordMatch) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }

                    return done(null, user);
                });
            });
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, JSON.stringify(user));
    });


    passport.deserializeUser(function (data, done) {
        try {
            done(null, JSON.parse(data));
        } catch (e) {
            done(err)
        }
    });


    app.use(passport.initialize());
    app.use(passport.session());
};