'use strict';

var http = require('http');
var express = require('express');
var kraken = require('kraken-js');

var app = module.exports = express();
var options = require('./lib/spec')(app);
app.use(kraken(options));

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
app.on('shutdown', function () {
    console.log('Shutting down application');
});
app.on('stop', function () {
    console.log('the http server is no longer connected or the shutdown timeout has expired');
});

/*
 * Create and start HTTP server.
 */
//if (!module.parent) {
    (function () {
        /*
         * This is only done when this module is run directly, e.g. `node .` to allow for the
         * application to be used in tests without binding to a port or file descriptor.
         */
        var server = http.createServer(app);
        server.listen(process.env.PORT || 8000);
        server.on('listening', function () {
            console.log('Server listening on http://localhost:%d', this.address().port);
        });
    }());
//}
