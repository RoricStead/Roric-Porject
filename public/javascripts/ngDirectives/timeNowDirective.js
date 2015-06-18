'use strict';

// DIRECTIVE 'timeNow' ====================================================
// inject custom timeFunctions provider for flexibility and re-usability.

angular.module('demo').directive('timeNow', ['dateFilter', '$timeout', 'timeFunctions', 'mainFty', function(dateFilter, $timeout, timeFunctions, mainFty) {
    return {
        restrict:'E',
        link: function(scope, element, attrs) {
            var format = timeFunctions.getFormat();
            
            var updateTime = function() {
                var now = new Date();
                element.html(dateFilter(now.valueOf(), format));
                if(now.getHours() !== 0) {
                    console.log(now.getHours(), now.getMinutes(), 'every second...');
                    mainFty.updatePost(now);
                } else if(now.getHours() === 0 && now.getMinutes() === 0) {
                    console.log(now.getHours(), now.getMinutes(), 'every day...');
                    mainFty.updateDate(now);
                }
                $timeout(updateTime, 1000);
            }
            updateTime();
        }
    };
}]);