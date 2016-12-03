app.controller('tripController', ['$scope', '$http', 'ngProgress', '$state', '$uibModal','Notification', function ($scope, $http, ngProgress, $state, $uibModal,Notification) {
    // if($state)
    if($state.current.name==="users.trips"){
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
    }
    else if($state.current.name==="users.trips.edit"){
        console.log($state.params.id);
        $http.get("/usertrips/getTripByUserId/"+$state.params.id)
            .success(function(data){
                debugger
                if(data.code == 200){
                    console.log(JSON.stringify(data));
                    $scope.editProperty = data.data[0];
                    $scope.checkinDate = new Date($scope.editProperty.fromdate.split("T")[0]);
                    $scope.checkoutDate = new Date($scope.editProperty.todate.split("T")[0]);
                    sessionStorage.editProperty = JSON.stringify($scope.editProperty);
                    $state.go("users.trips.edit");
                }else if(data.code == 401){

                }

            })
            .error(function (err) {

            });
    }else if($state.current.name==="users.trips.preview"){
        console.log($state.params.id);
        $http.get("/usertrips/getTripByUserId/"+$state.params.id)
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
    }
    // if(sessionStorage.property){
    //     $scope.property = JSON.parse(sessionStorage.property);
    // }
    // if(sessionStorage.editProperty){
    //     $scope.editProperty = JSON.parse(sessionStorage.editProperty);
    // }
    // $scope.getUserTrips = function () {
    //
    // };
    // $scope.getElementById("from")

    // $scope.getPreview = function () {
    //     debugger
    //     //console.log(this.trip.tripid);
    //
    //
    // };
    // $scope.goToEditTrip = function () {
    //
    // };
    
    $scope.updateTrip = function () {
        var obj = {};
        debugger
        $scope.editProperty.todate = $scope.checkoutDate;
        $scope.editProperty.fromdate = $scope.checkinDate;
        $http.post("/usertrips/edit", $scope.editProperty)
            .success(function (data) {
                debugger
                 if(data.code === 200){
                     Notification.success("Successfully updated your trip.");
                     $state.go("users.trips");
                 }
            }).error(function (err) {

            });
    };
    
    $scope.cancelTrip = function () {
        $http.post("/usertrips/cancelTrip", this.trip)
            .success(function (data) {
                if(data.code === 200){
                    Notification.success("Successfully cancelled your trip.");
                    $state.go("users.trips");
                }
            })
            .error(function (err) {

            })
    };

    $scope.format='MM-dd-yyyy'
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };


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
