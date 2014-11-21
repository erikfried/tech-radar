'use strict';
var db = require('../../lib/db');

function renderLatest(req, res) {
    return db.findLatest()
        .then(render(req, res));
}

function render(req, res) {
    return function (model) {
        res.json(model);
    };
}

module.exports = function (router) {
    router.get('/', renderLatest);
    router.get('/latest', renderLatest);
};
