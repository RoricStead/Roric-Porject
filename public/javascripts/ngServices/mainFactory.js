'use strict';

// FACTORY 'name' =============================================================
angular.module('demo').factory('mainFty', function() {
    var timePosts = [];

    var factory = {
        addPost: function() {
            var currTime = Date.now();
            timePosts.push(currTime);
        },

        retrievePosts: function() {
            if(timePosts.length<0){
                return false;
            } else {
                return timePosts;
            }
        }
    };

    return factory;
});