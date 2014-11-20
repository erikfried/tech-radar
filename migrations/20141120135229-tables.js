var async = require('async');
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
    async.series([
    db.createTable('radar', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string', length: 255, notNull: true },
        createdAt: { type: 'timestamp', notNull: true },
        updatedAt: { type: 'timestamp', notNull: true }
    }, callback),
    db.createTable('target', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string', length: 255, notNull: true },
        category: { type: 'string', length: 255, notNull: true },
        description: { type: 'text'},
        createdAt: { type: 'timestamp', notNull: true },
        updatedAt: { type: 'timestamp', notNull: true }
    }, callback),
    db.createTable('blip', {
        target_id: { type: 'int', notNull: true},
        radar_id: { type: 'int', notNull: true},
        distance: { type: 'int', notNull: true},
        comment: { type: 'text'},
        createdAt: { type: 'timestamp', notNull: true },
        updatedAt: { type: 'timestamp', notNull: true }
    })
    ], callback);

};

exports.down = function (db, callback) {
    db.dropTable('radar', callback);
    db.dropTable('target', callback);
    db.dropTable('blip', callback);
};
