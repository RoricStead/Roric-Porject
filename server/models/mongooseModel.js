'use strict';

var mongoose = require('mongoose');

// CREATE SCHEMA ==============================================================
var dateSchema = new mongoose.Schema({
    date: {type:number},
    MDY: {type:number, unique:true},
    messages: array
});

mongoose.model('date', dateSchema);

    // created_at: {type: Date, default: Date.now}
    // user_name: {type: String},
    // email_address: {type: String},  
    // password: {type: String},
    // message: Array,
