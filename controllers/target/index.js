'use strict';
var db = require('../../lib/db');
function render(req, res) {
    return function (model) {
        res.json(model);
    };
}

function all(req, res){
    console.log('ALL');
    db.findTargets()
        .then(render(req, res));
}

function create (req, res) {
    var obj = {
        category: req.param('category'),
        name: req.param('name'),
        description: req.param('description')
    };
    console.log('Creating', obj);
    return db.target.create(obj)
        .then(function (target) {
            res.status(201);
            res.json({uri: req.baseUrl +'/' + target, id: target});
        });
}

//exports.findAll = function(req, res){
//    db.Target.findAll({
////        include: [ db.Blip ]
//    }).success(function(blips) {
//        console.log('Targets: ', blips);
//        res.send(blips);
//
//    })
//};
//exports.find = function(req, res){
//    db.Target.find({
//        where : { id: parseInt(req.param('id'))},
//        include: [ {model: db.Blip, include: [db.Radar]}]
//    }).success(function(blips) {
//        console.log('Targets: ', blips);
//        res.send(blips);
//    })
//};


module.exports = function (router) {
    router.get('/', all);
    router.post('/', create);
};
