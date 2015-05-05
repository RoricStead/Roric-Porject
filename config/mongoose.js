'use strict';

var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'mongodb://localhost/temp_dev';
var fs = require('fs');

// BOOTSTRAP DB CONNECTION ====================================================
var connect = function() {
  var options = {server: {socketOptions: {keepAlive: 1}}};
  mongoose.connect(env, options);
}

// CONNECT TO MONGOOSE ========================================================
connect();

// ERROR HANDLER ==============================================================
mongoose.connection.on('error', function(err){
  console.log(err);
})

// RECONNECT WHEN CLOSED ======================================================
mongoose.connection.on('disconnected', function(){
  connect();
})

// BOOSTRAP MODELS ============================================================
var models_path = __dirname + '/../server/models';
fs.readdirSync(models_path).forEach(function(file){
  if (~file.indexOf('.js')) require(models_path + '/' + file);
})