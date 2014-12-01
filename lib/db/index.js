'use strict';
var rsvp = require('rsvp');
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
    var promise = new rsvp.Promise(function (resolve, reject) {
        return pg.connect(connectionUrl, function(err, client, done) {
            if(err) {
                logger.error('error fetching client from pool', err);
                return reject(err);
            }
            var queryObject = {name: name, text: query, values: filterParams};
            client.query(queryObject, function (err, result) {
                //call `done()` to release the client back to the pool
                done();
                if (err) {
                    console.warn('Failed running query', query, err);
                    return reject(err);
                }
                logger.debug('Result: ', query, filterParams, result.rowCount );
                if (result.command === 'INSERT') {
                    return resolve(result.rows[0].id);
                }
                resolve(result.rows);

            });
        });
    });
    return promise;
}

exports.findLatest = function () {
    return sql('latest_radar', 'select * from radar order by id desc limit 1').then(function pickOne(hits) {
        if (hits && hits.length > 0) {
            return hits[0];
        }
        return {};
    });
};


exports.findRadars = function () {
    return sql('all_radars', 'select * from radar order by id desc');
};
exports.findTargets = function () {
    return sql('latest_target', 'select * from target order by id desc').then(function pickOne(hits) {
        if (hits && hits.length > 0) {
            return hits;
        }
        return [];
    });
};
exports.radar = {
    getData: function (radarId) {
        return sql ('get_radar_data', [
        'select t.name, t.category, t.description, t.angle, b.distance, b.comment  from radar r ',
        'join blip b on b.radar_id = r.id',
        'join target t on t.id = b.target_id',
//        'left outer join blip lastb on b.target_id = lastb.target_id -- and lastb.radar_id < b.radar_id',
        'where r.id = 1' +
        'order by t.category, b.distance desc;'
        ].join(' '));
    }
};

exports.target = {
    create: function (o) {
        var angle = require('../shared/angleCalculator').radians(o.name);
        return sql('insert_target',
            'INSERT INTO target (name, category, angle, description, created, updated) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [o.name, o.category, angle, o.description, new Date(), new Date()] );
    }
};

exports.blip = {
    create: function (o) {
        return sql('insert_blip',
            'INSERT INTO blip (target_id, radar_id, distance, comment, created, updated) VALUES ($1, $2, $3, $4, $5, $6)' +
                ' RETURNING target_id, radar_id',
            [o.targetId, o.radarId, o.distance, o.comment, new Date(), new Date()])
        .catch(function (e) {
            if (e.code === '23505') {
                var message = 'Target already exist in this radar';
                console.log(message, e);
                throw {status: 400, message: message};
            }
            throw e;
        });
    }
};

exports.configure = function (dbUrl) {
    console.log('db config:', dbUrl);
    connectionUrl = dbUrl;
};
