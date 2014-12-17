'use strict';

var IndexModel = require('../models/index');
var auth = require('../lib/auth');

module.exports = function (router) {
    router.use(auth.check);

    var model = new IndexModel();
    router.get('/', function (req, res) {
        res.render('index', model);
    });

    router.get('/admin', function (req, res) {
       require('../lib/db')
           .findRadars()
           .then(function (radars){
                res.render('edit', {latest: radars[0].id, radars: radars});
           });
    });
};
