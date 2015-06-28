'use strict';

// DIRECTIVE 'timeNow' ====================================================
// inject custom timeFunctions provider for flexibility and re-usability.

angular.module('demo').directive('timeNow', ['dateFilter', '$timeout', 'timeFunctions', 'mainFty', function(dateFilter, $timeout, timeFunctions, mainFty) {
    return {
        restrict:'E',
        link: function(scope, element, attrs) {
            var format = timeFunctions.getFormat();
           
            var nowTime = new Date();
            var nowTimeMDY =    nowTime.getFullYear()*10000+
                                ((nowTime.getMonth()+1)*100)+
                                nowTime.getDate();
            scope.getNowTime = nowTime.getTime();
            
            var updateTime = function() {
                var now = new Date();
                element.html(dateFilter(now.getTime(), format));
                mainFty.checkPost(now);
                var compareMDY = now.getFullYear()*10000+
                                ((now.getMonth()+1)*100)+
                                now.getDate();
                if(nowTimeMDY !== compareMDY) {
                    nowTimeMDY = compareMDY;
                    scope.getNowTime = now.getTime();
                }
                $timeout(updateTime, 1000);
            }
            
            updateTime();
        }
    };
}]);