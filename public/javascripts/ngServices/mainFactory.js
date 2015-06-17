'use strict';

// FACTORY 'mainFty' ==========================================================
angular.module('demo').factory('mainFty', function() {
    var displayFuture = [];    
    var displayTFuture = [];
    var displayTPast = [];
    var displayPast = [];
    var selectTime = {
        mms: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
        hours: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        minutes: ['00','05','10','15','20','25','30','35','40','45','50','55']
    };

    // Insert sort future *****************************************************
    function insertSortFuture() {
        var position = -1;
        
        for(var i=1, c=displayFuture.length; i<c; i++) {
            var temp = displayFuture[i];
            for(var j=i-1; j>= 0 && displayFuture[j].timeObject.valueOf()<temp.timeObject.valueOf(); j--) {
    
                displayFuture[j+1]=displayFuture[j];
                position = j;
            }          
          
            displayFuture[position]=temp;
            position = -1;
         }
    }  
    // Insert sort T Future ***************************************************
    function insertSortTFuture() {
        var position = -1;
        
        for(var i=1, c=displayTFuture.length; i<c; i++) {
            var temp = displayTFuture[i];
            for(var j=i-1; j>= 0 && displayTFuture[j].timeObject.valueOf()<temp.timeObject.valueOf(); j--) {
    
                displayTFuture[j+1]=displayTFuture[j];
                position = j;
            }          
            displayTFuture[position]=temp;
            position = -1;
        }
    }
    // Insert sort T past *****************************************************
    function insertSortTPast() {
         var position = -1;
        
        for(var i=1, c=displayTPast.length; i<c; i++) {
            var temp = displayTPast[i];
            for(var j=i-1; j>= 0 && displayTPast[j].timeObject.valueOf()<temp.timeObject.valueOf(); j--) {
                displayTPast[j+1]=displayTPast[j];
                position = j;
            }          
            displayTPast[position]=temp;
            position = -1;
        }
    }

    // Insert sort past *******************************************************
    function insertSortPast() {
        var position = -1;
        
        for(var i=1, c=displayPast.length; i<c; i++) {
            var temp = displayPast[i];
            for(var j=i-1; j>= 0 && displayPast[j].timeObject.valueOf()<temp.timeObject.valueOf(); j--) {
    
                displayPast[j+1]=displayPast[j];
                position = j;
            }          
            displayPast[position]=temp;
            position = -1;
        }
    } 

    // Insert sort data *******************************************************
    function insertSortData(arrayIn) {
        var position = -1;
        
        for(var i=1, c=arrayIn.length; i<c; i++) {
            var temp = arrayIn[i];
            for(var j=i-1; j>= 0 && arrayIn[j].timeObject.valueOf()<temp.timeObject.valueOf(); j--) {
    
                arrayIn[j+1]=arrayIn[j];
                position = j;
            }          
            arrayIn[position]=temp;
            position = -1;
        }

        return arrayIn;
    } 

    function rebuildData(postIn, MDYIn) {
        var data = {};
        data.timeObject = postIn.timeObject;
        data.MDY = MDYIn;
        data.messages = [];
        var post = {};
        post.timeObject = postIn.timeObject;
        post.HM = postIn.HM;
        post.content = postIn.content;
        data.messages.push(post);

        return data;
    } //***********************************************************************
    

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
            var compareNow = new Date();
            var nowMDY =    compareNow.getFullYear()+
                            compareNow.getMonth()+
                            compareNow.getDay();
            var timeMDY =   selectedTime.getFullYear()+
                            selectedTime.getMonth()+
                            selectedTime.getDay();
            var opHM =      selectedTime.getHours()+
                            selectedTime.getMinutes();
            var onePost = {};
            onePost.timeObject = selectedTime;
            onePost.HM = opHM;
            onePost.content = inputMessage;

            if(selectedTime.valueOf() > compareNow.valueOf()) {
                if(timeMDY === nowMDY) {
                    displayTFuture.push(onePost);
                    insertSortTFuture();
                } else {
                    var i = 0, c = displayFuture.length
                    for(; i<c; i++){
                        if(displayFuture[i].MDY === timeMDY) {
                            displayFuture[i].messages.push(onePost);
                            displayFuture[i].messages = insertSortData(displayFuture[i].messages);
                            break;
                        }
                    }

                    if(i === c) {
                        displayFuture.push(rebuildData(onePost, timeMDY)); 
                        insertSortFuture();
                    }
                }
            } else if(selectedTime.valueOf() <= compareNow.valueOf()) {
                if(timeMDY === nowMDY) {
                    displayTPast.push(onePost);
                    insertSortTPast();
                } else {
                    var i = 0, c = displayPast.length
                    for(; i<c; i++){
                        if(displayPast[i].MDY === timeMDY) {
                            displayPast[i].messages.push(onePost);
                            displayPast[i].messages = insertSortData(displayPast[i].messages);
                            break;
                        }
                    }

                    if(i === c) {
                        displayPast.push(rebuildData(onePost, timeMDY));
                        insertSortPast();
                    }
                }
            }
        },
        updatePost: function(tbObjectIn) {
            var tbHMin = tbObjectIn.getHours()+tbObjectIn.getMinutes();
            
            if(displayTFuture.length>0) {
                for(var i=displayTFuture.length-1, c=0; i>=c; i--){
                    if(displayTFuture[i].HM === tbHMin ){
                        displayTPast.push(displayTFuture.pop());
                    } else break;
                }
                insertSortTPast();
           }
        },
        updateDate: function(tbObjectIn) {
        
            if(displayTPast.length>0) {
                var pastPost = displayTPast.pop();
                var ppMDY = pastPost.timeObject.getFullYear()+
                            pastPost.timeObject.getMonth()+
                            pastPost.timeObject.getDay();
                var pastData = rebuildData(pastPost, ppMDY);

                for(var i=0, c=displayTPast.length; i<c; i++){
                    pastData.messages.push(displayTPast[i]);
                }
                
                displayTPast=[];
                pastData.messages = insertSortData(pastData.messages);
                displayPast.push(pastData);
                insertSortPast();
            }

            var tbMYDin =   tbObjectIn.getFullYear()+
                            tbObjectIn.getMonth()+
                            tbObjectIn.getDay();
            
            var lastFuture = displayFuture[displayFuture.length-1];
            if(displayFuture.length>0 && lastFuture.MDY === tbMYDin) {
                lastFuture = displayFuture.pop();
                for(var i=0, c=lastFuture.messages.length; i<c; i++) {
                    displayTFuture.push(lastFuture.messages[i]);
                }
            }
        }
    };

    return factory;
});


    
    