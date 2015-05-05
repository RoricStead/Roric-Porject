'use strict';
var mongoose = require('mongoose');
var Temp = mongoose.model('temp');

module.exports = {
    index: function(request, response) {
        response.render('index',  {title: 'demo'});
    }
}
