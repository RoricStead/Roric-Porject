'use strict';

var mongoose = require('mongoose');

// CREATE SCHEMA ==============================================================
var postSchema = new mongoose.Schema({
    time: string,
    timeMDY: number,
    timeHM: number,
    messages: string
});

mongoose.model('post', postSchema);

    // created_at: {type: Date, default: Date.now}
    // user_name: {type: String},
    // email_address: {type: String},  
    // password: {type: String},
    // message: Array,
