app.controller('tripController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal','$window', 'Upload','Notification', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload,Notification) {
    $scope.getUserTrips = function () {
        $http.get("/users/trips").success(function (response) {
            alert(JSON.stringify(response));
            $scope.pendingtrips = [];
            $scope.usertrips = [];
            if(response.code == 200) {
                var resArray = response.data;
                for(var i=0; i<resArray.length; i++) {
                    if(resArray[i].tripstatus == "pending") {
                        $scope.pendingtrips.push(resArray[i]);
                    }else {
                        $scope.usertrips.push(resArray[i]);
                    }
                }
            }else if (response.code === 401) {

            }
        }).error(function (err) {
            alert('error');
        });
    };

    $scope.getPreview = function () {
        $http.get("/gettripsbyuserid").success(function(response){
                $state.go("users.trips.preview");
            })
            .error(function (err) {

            });

    }

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

    
}]);
