'use strict';

// FACTORY 'name' =============================================================
angular.module('demo').factory('mainFty', function() {
    var inputPosts = [];

    var factory = {
        addPost: function(message) {
            var onePost = {};
            onePost.currTime = Date.now();
            onePost.content = message;
            inputPosts.push(onePost);
        },

        retrievePosts: function() {
            return inputPosts;
        }
    };

    return factory;
});