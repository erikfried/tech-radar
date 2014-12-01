'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('../lib/auth'),
    db = require('../lib/db');

module.exports = function spec(app) {
    app.on('middleware:after:session', function configPassport() {
        //Tell passport to use our created google strategy for authentication
        passport.use(auth.googleStrategy());
        // Passport session setup.
        //   To support persistent login sessions, Passport needs to be able to
        //   serialize users into and deserialize users out of the session.  Typically,
        //   this will be as simple as storing the user ID when serializing, and finding
        //   the user by ID when deserializing.  However, since this app does not
        //   have a database of user records, the complete Google profile is serialized
        //   and deserialized.
        passport.serializeUser(function(user, done) {console.log('Serialize', user); done(null, user);});
        passport.deserializeUser(function(obj, done) {console.log('Deserialize', obj); done(null, obj);});
        app.use(passport.initialize());
        app.use(passport.session());
    });
    return {
        onconfig: function(config, next) {

            console.log('CONFIG', config);
            db.configure(config.get('DATABASE_URL') || config.get('databaseUrl'));
            auth.configure(config.get('authConfig'));
            next(null, config);
        }
    };

};
