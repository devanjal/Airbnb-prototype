var hostApp = angular.module('hostApp',[]);
hostApp.controller('hostController', function ($scope, $http) {
    $scope.roomInfo =
    [
        {
            roomType: 'Entire place',
            roomPrice: 421,
            selected: true
        },
        {
            roomType: 'Private room',
            roomPrice: 239,
            selected: false
        },
        {
            roomType: 'Shared room',
            roomPrice: 174,
            selected: false
        }
    ];

    $scope.selectedDoc = {};

    $scope.$watch('roomInfo', function () {
        $scope.selectedDoc = $scope.roomInfo[0];
    });
});