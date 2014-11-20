'use strict';
var Q = require('q');
var pg = require('pg');
var logger = console;
logger.debug = console.log;

var connectionUrl;
/**
 * @param name
 * @param query
 * @param filterParams
 * @returns {promise|Q.promise}
 */
function sql(name, query, filterParams) {
    console.log('Query', query, filterParams);
    var deferred = Q.defer();
    pg.connect(connectionUrl, function(err, client, done) {
        if(err) {
            return logger.error('error fetching client from pool', err);
        }
        deferred.notify('connected');

        var queryObject = {name: name, text: query, values: filterParams};
        client.query(queryObject, function(err, result) {
            //call `done()` to release the client back to the pool
            done();
            if(err) {
                deferred.reject(new Error(err));
            } else {
                logger.debug("Result: ", query, filterParams, result.rowCount );
                deferred.resolve(result.rows);
            }
        });
    });
    return deferred.promise;
}
exports.findLatest = function () {
    return sql('latest_radar', 'select * from radar order by id desc limit 1').then(function pickOne(hits) {
        if (hits && hits.length > 0) {
            return hits[0];
        }
        return {};
    });
}

exports.configure = function (dbUrl) {
    console.log('db config:', dbUrl);
    connectionUrl = dbUrl;
};
