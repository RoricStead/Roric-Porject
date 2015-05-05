'use strict';

// REQUIRE ====================================================================
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('./config/mongoose');             // Require mongoose
var serverRoutes = require('./config/serverRoutes');     // Require routes
    //var cookieParser = require('cookie-parser');
    //var favicon = require('serve-favicon');

// CONFIGURING OUR ENVIRONMENT ===============================================
var app = express();

// SETUP VIEW ENGIN
app.set('view engine', 'ejs');                           // use ejs to compile 
app.set('views', path.join(__dirname, 'server/views'));  // set to server/views
                                                        
// SETUP STATIC FILE FOLDER
app.use(express.static(path.join(__dirname, 'public'))); // set to public 
                                        // set for Angular and Angular-route
app.use(express.static(path.join(__dirname, 'node_modules/angular')));
app.use(express.static(path.join(__dirname, 'node_modules/angular-route')));
    
// SETUP PORT
app.set('port', process.env.PORT || 6789);               // set port at 6789

// USE BODYPARSER
app.use(bodyParser.json());                              // handles POST data
app.use(bodyParser.urlencoded({ extended: false }));     // handles POST data
    
    // USE COOKIEPARSER
    //app.use(cookieParser());                           // handles session
    //app.use(cookieParser.session( {secret:'ninja'} )); // handles session
 
    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.icon'));


// ROUTES ==========================================================
var route = express.Router();
serverRoutes(route);

app.listen(app.get('port'), function() {
    console.log('\n ***************************************************');
    console.log('   Express server listening on port ' + app.get('port'));
    console.log(' ***************************************************\n');
});