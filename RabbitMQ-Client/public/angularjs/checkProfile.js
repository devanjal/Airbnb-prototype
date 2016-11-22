var checkProfile = angular.module('checkProfile', []);
checkProfile.controller('checkProfile', function($scope, $http,$window) {
    $http.get("/checkProfile").success(function (data) {
        $scope.test = data;
        $scope.first_name = data.first_name;
        $scope.last_name = data.last_name;
        $scope.email = data.email;
        $scope.month = data.month;
        $scope.day = data.day;
        $scope.year = data.year;
        $scope.location = data.location;

        alert($scope.x);
    });
}
);