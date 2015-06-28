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
            for(var j=i-1; j>= 0 && displayFuture[j].timeObject.getTime()<temp.timeObject.getTime(); j--) {
    
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
            for(var j=i-1; j>= 0 && displayTFuture[j].timeObject.getTime()<temp.timeObject.getTime(); j--) {
    
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
            for(var j=i-1; j>= 0 && displayTPast[j].timeObject.getTime()<temp.timeObject.getTime(); j--) {
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
            for(var j=i-1; j>= 0 && displayPast[j].timeObject.getTime()<temp.timeObject.getTime(); j--) {
    
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
            for(var j=i-1; j>= 0 && arrayIn[j].timeObject.getTime()<temp.timeObject.getTime(); j--) {
    
                arrayIn[j+1]=arrayIn[j];
                position = j;
            }          
            arrayIn[position]=temp;
            position = -1;
        }

        return arrayIn;
    } 

    // Rebuild Data************************************************************
    function rebuildData(postIn) {
        var data = {};
        data.timeObject = postIn.timeObject;
        data.MDY = postIn.MDY;
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
            var nowMDY =    compareNow.getFullYear()*10000+
                            ((compareNow.getMonth()+1)*100)+
                            compareNow.getDate();
            var timeMDY =   selectedTime.getFullYear()*10000+
                            ((selectedTime.getMonth()+1)*100)+
                            selectedTime.getDate();
            var opHM =      (selectedTime.getHours()*100)+
                            selectedTime.getMinutes();
            var onePost = {};
            onePost.timeObject = selectedTime; 
            onePost.MDY = timeMDY;
            onePost.HM = opHM;
            onePost.content = inputMessage;

            if(selectedTime.getTime() > compareNow.getTime()) {
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
                        displayFuture.push(rebuildData(onePost)); 
                        insertSortFuture();
                    }
                }
            } else if(selectedTime.getTime() <= compareNow.getTime()) {
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
                        displayPast.push(rebuildData(onePost));
                        insertSortPast();
                    }
                }
            }
        },
        checkPost: function(tbObjectIn) {
            var tbTime = {};
            tbTime.MDY =    tbObjectIn.getFullYear()*10000+
                            ((tbObjectIn.getMonth()+1)*100)+
                            tbObjectIn.getDate();
            tbTime.HM =     (tbObjectIn.getHours()*100)+
                            tbObjectIn.getMinutes();
            
            if(displayTFuture.length > 0 &&
               displayTFuture[displayTFuture.length-1].MDY === tbTime.MDY) {
                    for(var i=displayTFuture.length-1, c=0; i>=c; i--){
                        if(displayTFuture[i].HM <= tbTime.HM){
                            displayTPast.push(displayTFuture.pop());
                        } else break;

                        insertSortTPast();
                    }
            }else if(
                displayTFuture.length > 0 
                && displayTFuture[displayTFuture.length-1].MDY !== tbTime.MDY 
                || displayTPast.length > 0
                && displayTPast[0].MDY !== tbTime.MDY){
                
                if(displayTFuture.length >0 ) {
                    for(var i=displayTFuture.length-1, c=0; i>=c; i--){
                        displayTPast.push(displayTFuture.pop());
                    }   
                }

                if(displayTPast.length>0) {
                    var pastPost = displayTPast.pop();
                    var pastData = rebuildData(pastPost);

                    for(var i=0, c=displayTPast.length; i<c; i++) {
                        pastData.messages.push(displayTPast.pop());
                    }
                    
                    pastData.messages = insertSortData(pastData.messages);
                    displayPast.push(pastData);
                    insertSortPast();
                }
            }; 

            if(displayFuture.length > 0 && 
               displayFuture[displayFuture.length-1].MDY <= tbTime.MDY) {

                if(displayFuture[displayFuture.length-1].MDY < tbTime.MDY) {
                   for(var i=displayFuture.length-1, c=0; i>= c ; i--){
                        if(displayFuture[i].MDY < tbTime.MDY) {
                            displayPast.push(displayFuture.pop());
                        } else break;
                    }
                    insertSortPast;
                }

                if(displayFuture[displayFuture.length-1].MDY === tbTime.MDY) {
                    var lastFuture = displayFuture.pop();
                    for(var i=0, c=lastFuture.messages.length; i<c; i++) {
                        if(lastFuture.messages[i].HM <= tbTime.HM) {
                            displayTPast.push(lastFuture.messages[i]);
                        } else {
                            displayTFuture.push(lastFuture.messages[i]);
                        }
                    }
                    insertSortTFuture();
                    insertSortTPast();
                }  
            }    
        }
    };

    return factory;
});
 
           