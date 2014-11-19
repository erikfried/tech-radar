'use strict';
var passport = require('passport');

module.exports = function (router) {

    // Redirect the user to Google for authentication.  When complete, Google
    // will redirect the user back to the application at
    //     /auth/return
    router.get('/', passport.authenticate('google'));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    router.get('/return', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

};
