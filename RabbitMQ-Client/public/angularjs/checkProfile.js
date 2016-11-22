var checkProfile = angular.module('checkProfile', []);
checkProfile.controller('checkProfile', function($scope, $http,$window) {
    $http.get("/checkProfile").success(function (data) {
        $scope.test = data;
        $scope.first_name = data.first_name;
        $scope.join_date=data.join_date
        $scope.location = data.location;

        alert($scope.x);
    });
}
);