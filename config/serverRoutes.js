
var serverCtrl = require('./../server/controllers/serverController.js');
module.exports = function Routes(app) {

  // EXPRESS
  app.get('/', function (req,res) {serverCtrl.index(req,res);});

};
