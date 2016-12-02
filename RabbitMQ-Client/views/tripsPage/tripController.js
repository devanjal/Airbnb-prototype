app.controller('tripController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal','$window', 'Upload','Notification', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload,Notification) {
    if(sessionStorage.property){
        $scope.property = JSON.parse(sessionStorage.property);
    }
    if(sessionStorage.editProperty){
        $scope.editProperty = JSON.parse(sessionStorage.editProperty);
    }
    $scope.getUserTrips = function () {
        $http.get("/usertrips").success(function (response) {
            // alert(JSON.stringify(response));
            $scope.pendingtrips = [];
            $scope.usertrips = [];
            if(response.code == 200) {
                debugger
                var resArray = response.data;
                for(var i=0; i<resArray.length; i++) {
                    if(resArray[i].tripstatus == "pending") {
                        $scope.pendingtrips.push(resArray[i]);
                    }else {
                        $scope.usertrips.push(resArray[i]);
                    }
                }
            }else if (response.code == 401) {

            }
        }).error(function (err) {

        });
    };
    $scope.getElementById("from")

    $scope.getPreview = function () {
        debugger
        //console.log(this.trip.tripid);
        $http.get("/usertrips/getTripByUserId/"+this.trip.tripid)
            .success(function(data){
                debugger
                if(data.code == 200){
                    // console.log(JSON.stringify(data));
                    $scope.property = data.data[0];
                    sessionStorage.property = JSON.stringify($scope.property);
                    $state.go("users.trips.preview");
                }else if(data.code == 401){

                }

            })
            .error(function (err) {

            });

    };
    $scope.goToEditTrip = function () {
        $http.get("/usertrips/getTripByUserId/"+this.trip.tripid)
            .success(function(data){
                debugger
                if(data.code == 200){
                    console.log(JSON.stringify(data));
                    $scope.editProperty = data.data[0];
                    sessionStorage.editProperty = JSON.stringify($scope.editProperty);
                    $state.go("users.trips.edit");
                }else if(data.code == 401){

                }

            })
            .error(function (err) {

            });
    };
    
    $scope.edit = function () {
        var obj = {};
        // obj.tripid = this
        $http.post("/usertrips/edit", $scope.editProperty)
            .success(function (data) {
                debugger
                 if(data.code === 200){
                     $state.go("users.trips");
                 }
            }).error(function (err) {

            });
    };
    
    $scope.cancelTrip = function () {
        
    };

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
