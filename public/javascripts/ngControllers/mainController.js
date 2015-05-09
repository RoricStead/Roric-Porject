'use strict';

//CONTROLLER 'name' ===========================================================

angular.module('demo').controller('mainCtrl', ['$scope', '$compile', 'timeFunctions', function($scope, $compile, timeFunctions) {
    
    this.createMsg = function() {
        $scope.currTime = Date.now();
        var dataWrapperEl = angular.element(document.createElement('date-wrapper'));
        var compileDatawrapperEl = $compile(dataWrapperEl)($scope)
        angular.element(document.getElementById('today')).append(compileDatawrapperEl);

    }
}]);

//     this.tab = 1;
//     this.selectTab = function(setTab) {
//         this.tab = setTab;
//     }
//     this.isSelected = function(checkTab) {
//         return this.tab === checkTab;
//     }
//     this.viewfooterdatas = function() {
//         return mainFty.getData();
//     }
