app.controller('tripController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', 'Upload','Notification', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload,Notification) {
    $http({
        method: 'GET',
        url:'/'
    }).success(function (response) {
        alert(JSON.stringify(response));
    }).error(function (err) {
        alert('error');
    });
    $scope.format='MM-dd-yyyy'
    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };
    $scope.getPreview = function () {
        $http({
            method: GET,
            url: '/gettripsbyuserid'
        }).success(function(data){
            $state.go("users.trips.preview");
        })
        .error(function (err) {
            
        });
        
    }
    
}]);
