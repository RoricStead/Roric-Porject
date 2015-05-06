'use strict';

// DIRECTIVE 'timeBar' ====================================================

angular.module('demo').directive('timeBar', ['dateFilter', '$interval', function(dateFilter, $interval) {
    return {
        restrict:'E',
        link: function(scope, element, attrs) {
            var format = 'M/d/yy h:mm:ss a';
            
            var updateTime = function() {
                var now = Date.now();
                element.html(dateFilter(now, format));
            }

            $interval(updateTime, 1000);
        }
    };
}]);