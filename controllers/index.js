'use strict';

var IndexModel = require('../models/index');
var auth = require('../lib/auth');

module.exports = function (router) {
    router.use(auth.check);

    var model = new IndexModel();
    router.get('/', function (req, res) {
        res.render('index', model);
    });
};
