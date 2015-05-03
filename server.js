'use strict';

// Require ====================================================================
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./config/serverRoutes');
    //var favicon = require('serve-favicon');

// configuring our environments ===============================================
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// port setup
app.set('port', process.env.PORT || 6789);
    
    // uncomment after placing your favicon in /public
    // app.use(favicon(__dirname + '/public/favicon.ico'));

// bodyParser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookieParser setup
app.use(cookieParser());

// express static file folder setup
app.use(express.static(path.join(__dirname, 'public')));

// Routes =====================================================================
var serverRoutes = express.Router();

serverRoutes(app);

app.listen(app.get('port'), function() {
    console.log('\n ***************************************************');
    console.log('*****   Express server listening on port ' + app.get('port') + '   *****');
    console.log(' ***************************************************\n');
});