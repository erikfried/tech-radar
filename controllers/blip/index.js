'use strict';
var db = require('../../lib/db');

function create(req, res) {
    var obj = {
        targetId: req.param('targetId'),
        radarId: req.param('radarId'),
        distance: req.param('distance'),
        comment: req.param('comment')
    };
    console.log('Creating blip', obj);
    return db.blip.create(obj)
        .then(function (blip) {
            res.status(201);
            res.json({uri: req.baseUrl +'/' + blip})
        });
}

module.exports = function (router) {
    router.post('/', create);
};


