'use strict';

// DIRECTIVE 'dataWrapper' ====================================================

angular.module('demo').directive('onePostWrapper', function() {
    return {
        restrict:'E',
        replace: true,
        scope: {
            inputMsg: '='
        },
        templateUrl:'templates/onePostWrapper.html',
    };
});