'use strict';

//CONTROLLER 'name' ===========================================================

angular.module('demo').controller('mainCtrl', ['$scope', '$compile', 'mainFty', function($scope, $compile, mainFty) {
    
    this.getSelectTime = mainFty.retrieveSelectTime();
    this.posts = mainFty.retrievePosts();
    this.createPost = function() {mainFty.addPost($scope.message, $scope.timeSelected);}

    
}]);

        // $scope.currTime = Date.now();
        // var dataWrapperEl = angular.element(document.createElement('date-wrapper'));
        // var compileDatawrapperEl = $compile(dataWrapperEl)($scope)
        // angular.element(document.getElementById('today')).append(compileDatawrapperEl);
