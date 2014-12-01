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
            res.json({uri: req.baseUrl +'/' + blip, id: blip});
        })
        .catch(function (e) {
            console.log('Failed inserting blip', e);
            res.status(e.status || 500);
            res.json({error: e.message || 'Sorry, technical error'});
        });
}

module.exports = function (router) {
    router.post('/', create);
};
