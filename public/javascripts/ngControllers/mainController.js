'use strict';

//CONTROLLER 'name' ===========================================================

angular.module('demo').controller('mainCtrl', ['$scope', '$compile', 'mainFty', function($scope, $compile, mainFty) {
    
    this.getSelectTime = mainFty.retrieveSelectTime();
    this.posts = mainFty.retrievePosts();
    // this.todayFuturePosts = mainFty.retrieveTodayFuture();
    // this.todayPastPosts = mainFty.retrieveTodayPast();
    this.createPost = function() {
        console.log($scope.message, $scope.timeSelected);
        if($scope.message && $scope.timeSelected) {
            var inputTimeString = Date.parse(
                $scope.timeSelected.mm +" "+
                $scope.timeSelected.dd +" "+
                $scope.timeSelected.yyyy +" "+
                $scope.timeSelected.hour +":"+
                $scope.timeSelected.minute);
            mainFty.addPost($scope.message, inputTimeString);
            $scope.message='';
            $scope.timeSelected.dd = '';
            $scope.timeSelected.yyyy = '';
        }else if($scope.message) {
            var currTime = Date.now();
            mainFty.addPost($scope.message, currTime);
            $scope.message='';
        }
    }
}]);