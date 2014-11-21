var async = require('async');
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
    async.series([
        db.createTable.bind(db, 'radar', {
            id: { type: 'int', primaryKey: true, autoIncrement: true },
            name: { type: 'string', length: 255, notNull: true },
            created: { type: 'timestamp', notNull: true },
            updated: { type: 'timestamp', notNull: true }
        }),
        db.createTable.bind(db, 'target', {
            id: { type: 'int', primaryKey: true, autoIncrement: true },
            name: { type: 'string', length: 255, notNull: true },
            category: { type: 'string', length: 255, notNull: true },
            description: { type: 'text'},
            created: { type: 'timestamp', notNull: true },
            updated: { type: 'timestamp', notNull: true }
        }),
        db.createTable.bind(db, 'blip', {
            target_id: { type: 'int', notNull: true},
            radar_id: { type: 'int', notNull: true},
            distance: { type: 'int', notNull: true},
            comment: { type: 'text'},
            created: { type: 'timestamp', notNull: true },
            updated: { type: 'timestamp', notNull: true }
        }),
        db.addIndex.bind(db, 'blip', 'blip_key', ['target_id', 'radar_id'], true)
    ], callback);

};

exports.down = function (db, callback) {
    async.series([
        db.dropTable.bind(db, 'radar'),
        db.dropTable.bind(db, 'target'),
        db.dropTable.bind(db, 'blip')
    ], callback);
};
