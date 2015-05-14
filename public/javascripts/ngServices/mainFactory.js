'use strict';

// FACTORY 'name' =============================================================
angular.module('demo').factory('mainFty', function() {
    var displayPosts = [];
    var selectTime = {
        mms: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
        hours: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
        minutes: ['00','05','10','15','20','25','30','35','40','45','50','55']
    
    };

    var factory = {
        retrieveSelectTime: function() {
            return selectTime;
        },

        addPost: function(inputMessage, selectedTime) {
            var onePost = {};
            var inputTimeString = selectedTime.mm + " " + selectedTime.dd + " " + selectedTime.yyyy + " " + selectedTime.hour + ":" + selectedTime.minute;
            onePost.inputTime = Date.parse(inputTimeString);
            onePost.content = inputMessage;
            displayPosts.push(onePost);
        },

        retrievePosts: function() {
            return displayPosts;
        }


    };

    return factory;
});