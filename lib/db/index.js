'use strict';

var connectionUrl;
/**
 * @param name
 * @param query
 * @param filterParams
 * @returns {promise|Q.promise}
 */
function sql(name, query, filterParams) {
    logger.debug('Query', query, filterParams);
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

exports.configure = function (dbUrl) {
    console.log('db config:', dbUrl);
    connectionUrl = dbUrl;
};
