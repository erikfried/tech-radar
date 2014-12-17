'use strict';
var db = require('../../lib/db');
var _ = require('lodash');


var renderLatest = function fetchAndRenderLatest(req, res) {
    return db.findLatest()
        .then(function (latest) {
            return renderRadar(req, res, latest);
        });
};
function renderData(req, res) {
    var radarId = req.param('id');
    return renderRadar(req, res, radarId);

}
function renderRadar(req, res, radarId) {
    return db.radar.getData(radarId)
        .then(function (itemsList) {
            var grouped = _.groupBy(itemsList, function (item) {
                return item.category;
            });
            console.log('Grouped', grouped);
            Object.keys(grouped).forEach(function (key) {
                grouped[key] = _.groupBy(grouped[key], function (item) {
                    if (item.distance < 25) {return 'Adopt';}
                    if (item.distance < 50) {return 'Trial';}
                    if (item.distance < 75) {return 'Asses';}
                    return 'Hold';
                });
            });
            console.log('Grouped and sorted', grouped);
            return grouped;
        })
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
    router.get('/:id', renderData);
};
