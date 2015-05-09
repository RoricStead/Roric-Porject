'use strict';

// DIRECTIVE 'timeBar' ====================================================
// inject custom timeFunctions provider for flexibility and re-usability.

angular.module('demo').directive('timeNow', ['dateFilter', '$timeout', 'timeFunctions', function(dateFilter, $timeout, timeFunctions) {
    return {
        restrict:'E',
        link: function(scope, element, attrs) {
            var format = timeFunctions.getFormat();
            
            var updateTime = function() {
                var now = Date.now();
                element.html(dateFilter(now, format));
                $timeout(updateTime, 1000);
            }

            updateTime();
        }
    };
}]);