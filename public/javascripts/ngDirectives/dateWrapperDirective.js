'use strict';

// DIRECTIVE 'dataWrapper' ====================================================

angular.module('demo').directive('dateWrapper', function() {
    return {
        restrict:'E',
        replace: true,
        scope: {
            inputMsg: '='
        },
        templateUrl:'templates/dateWrapper.html',
    };
});