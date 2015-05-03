'use strict';

var serverCtrl = require('./../server/controllers/serverController.js');
module.exports = function (app) {
    // default route
    app.get('/', function (req,res) {serverCtrl.index(req,res);});

};
