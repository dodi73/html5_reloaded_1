var reloaded = angular.module("reloaded", []);
reloaded.controller("hello", ['$scope', function($scope) {
    $scope.name = "Jeffrey";
}]);