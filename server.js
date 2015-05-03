var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
    //var favicon = require('serve-favicon');

// configuring our environments
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    // app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//we're going to have ./config/serverRoutes.js to handle all of our routing
var routes = require('./config/serverRoutes')(app);

app.set('port', process.env.PORT || 6789);
app.listen(app.get('port'), function() {
    console.log('\n ***************************************************');
    console.log('*****   Express server listening on port ' + app.get('port') + '   *****');
    console.log(' ***************************************************\n');
});