'use strict';

// FACTORY 'name' =============================================================
angular.module('demo').factory('mainFty', function() {
    var displayFuture = [];
    var displayTFuture = [];
    var displayTPast = [];
    var displayPast = [];

    function insertSortFuture() {
         var position = -1;
        
         for(var i=1, c=displayFuture.length; i<c; i++) {
         var temp = displayFuture[i];
             for(var j=i-1; j>= 0 && displayFuture[j].inputTime<temp.inputTime; j--) {
    
                 displayFuture[j+1]=displayFuture[j];
                 position = j;
             }          
          
             displayFuture[position]=temp;
             position = -1;
         }
    }
    
    function insertSortTFuture() {
         var position = -1;
        
         for(var i=1, c=displayTFuture.length; i<c; i++) {
         var temp = displayTFuture[i];
             for(var j=i-1; j>= 0 && displayTFuture[j].inputTime<temp.inputTime; j--) {
    
                 displayTFuture[j+1]=displayTFuture[j];
                 position = j;
             }          
          
             displayTFuture[position]=temp;
             position = -1;
         }
    }
   
    function insertSortTPast() {
         var position = -1;
        
         for(var i=1, c=displayTPast.length; i<c; i++) {
         var temp = displayTPast[i];
             for(var j=i-1; j>= 0 && displayTPast[j].inputTime<temp.inputTime; j--) {
                 displayTPast[j+1]=displayTPast[j];
                 position = j;
             }          
             displayTPast[position]=temp;
             position = -1;
         }
    }

    function insertSortPast() {
         var position = -1;
        
         for(var i=1, c=displayPast.length; i<c; i++) {
         var temp = displayPast[i];
             for(var j=i-1; j>= 0 && displayPast[j].inputTime<temp.inputTime; j--) {
    
                 displayPast[j+1]=displayPast[j];
                 position = j;
             }          
          
             displayPast[position]=temp;
             position = -1;
         }
    }

    function compare(timeIn) {
        var compareTimeIn = new Date(timeIn);
        return compareTimeIn.getMonth()+compareTimeIn.getDate()+compareTimeIn.getFullYear();
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
        retrieveFuture: function() {
            return displayFuture;
        },
        retrieveTFuture: function() {
            return displayTFuture;
        },
        retrieveTPast: function() {
            return displayTPast;
        },
        retrievePast: function() {
            return displayPast;
        },
        addPost: function(inputMessage, selectedTime) {
            var compareNow = Date.now();
            var onePost = {};
            
            if(selectedTime > compareNow) {
                 onePost.inputTime = selectedTime;
                 onePost.content = inputMessage;

                 var compareSelect = compare(selectedTime);
                 var compareTime = compare(compareNow);
                 
                 if (compareSelect === compareTime) {
                     displayTFuture.push(onePost);
                     insertSortTFuture();
                 } else {
                     displayFuture.push(onePost);
                     insertSortFuture();
                 }
            } else if(selectedTime <= compareNow) {
                 onePost.inputTime = selectedTime;
                 onePost.content = inputMessage;

                 var compareSelect = compare(selectedTime);
                 var compareTime = compare(compareNow);
                 
                 if(compareSelect === compareTime) {
                     displayTPast.push(onePost);
                     insertSortTPast();
                 } else {
                     displayPast.push(onePost);
                     insertSortPast();
                 }
            }
        }
    };

    return factory;
});