'use strict';
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

var AUTH_METHODS = /POST|PUT|DELETE/;

var admins = [];
var origin = 'http://some.host.com';

function isAdmin(req) {
    return req.user.emails.some(function (email) {
        return admins.some(function (admin) {
            return admin === email.value;
        });
    });
}
// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function check(req, res, next) {
    if (AUTH_METHODS.test(req.method)){
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            res.status(401);
            return res.render('errors/401');
        } else if (!isAdmin(req)) {
            res.status(403);
            return res.render('errors/403');
        }
    }
    next();
}

function googleStrategy() { return new GoogleStrategy({
            returnURL: origin + '/auth/return',
            realm: origin + '/'
        },
        function(identifier, profile, done) {
            profile.identifier = identifier;
            console.log('profile', profile);
            done(null, profile);
        }
    );
}

exports.googleStrategy = googleStrategy;
exports.check = check;

exports.configure = function (config) {
    console.log('Auth Config:', config);
    if (!config.admins || !config.admins.length) {
        console.log('No admins configured - Noone will be able to login. Set "authConfig.admins" in application config!');
    }
    admins = config.admins || admins;
    origin = config.origin || origin;
};
