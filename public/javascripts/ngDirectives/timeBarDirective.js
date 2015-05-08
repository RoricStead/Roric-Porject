'use strict';

// DIRECTIVE 'timeBar' ====================================================
// inject custom timeFunctions provider for flexibility and re-usability.

angular.module('demo').directive('timeBar', ['dateFilter', '$interval', 'timeFunctions', function(dateFilter, $interval, timeFunctions) {
    return {
        restrict:'E',
        link: function(scope, element, attrs) {
            var format = timeFunctions.getFormat();
            
            var updateTime = function() {
                element.html(dateFilter(timeFunctions.getTimeNow(), format));
            }

            $interval(updateTime, 1000);
        }
    };
}]);