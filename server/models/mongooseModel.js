'use strict';

var mongoose = require('mongoose');

// CREATE SCHEMA ==============================================================
var tempSchema = new mongoose.Schema({
    created_at: {type: Date, default: Date.now}
});

mongoose.model('temp', tempSchema);

     // user_name: {type: String},
     // email_address: {type: String},  
     // password: {type: String},
     // message: Array,
