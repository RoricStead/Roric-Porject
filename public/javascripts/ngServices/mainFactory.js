'use strict';

// FACTORY 'name' =============================================================
angular.module('demo').factory('mainFty', function() {
    var displayTodayPast = [];
    var displayTodayFuture = [];
    function insertSortPast() {
         var position = -1;
        
         for(var i=1, c=displayTodayPast.length; i<c; i++) {
         var temp = displayTodayPast[i];
             for(var j=i-1; j>= 0 && displayTodayPast[j].inputTime<temp.inputTime; j--) {
                 displayTodayPast[j+1]=displayTodayPast[j];
                 position = j;
             }          
             displayTodayPast[position]=temp;
             position = -1;
         }
    }

    function insertSortFuture() {
         var position = -1;
        
         for(var i=1, c=displayTodayFuture.length; i<c; i++) {
         var temp = displayTodayFuture[i];
             for(var j=i-1; j>= 0 && displayTodayFuture[j].inputTime<temp.inputTime; j--) {
    
                 displayTodayFuture[j+1]=displayTodayFuture[j];
                 position = j;
             }          
          
             displayTodayFuture[position]=temp;
             position = -1;
         }
    }
    
    var selectTime = {
        mms: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
        hours: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
        minutes: ['00','05','10','15','20','25','30','35','40','45','50','55']
    };

    var factory = {
        retrieveSelectTime: function() {
            return selectTime;
        },
        retrieveTodayPast: function() {
            return displayTodayPast;
        },
        retrieveTodayFuture: function() {
            return displayTodayFuture;
        },
        addPost: function(inputMessage, selectedTime) {
            var compareNow = Date.now();
            var onePost = {};
            
            if(selectedTime > compareNow) {
                 onePost.inputTime = selectedTime;
                 onePost.content = inputMessage;
                 displayTodayFuture.push(onePost);
                 insertSortFuture();
            } else if (selectedTime <= compareNow) {
                 onePost.inputTime = selectedTime;
                 onePost.content = inputMessage;
                 displayTodayPast.push(onePost);
                 insertSortPast();
            }
        }
    };

    return factory;
});