app.controller('listingController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', 'Upload', 'Notification', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload, Notification) {
    if ($state.current.name === "users.listings") {
        debugger
        $http.get("/property/searchbyuserid")
            .success(function (data) {
                debugger
                if (data.code === 200) {
                    $scope.listed_property = [];
                    $scope.inProgress_property = [];
                    angular.forEach(data.value, function (value, key) {
                        if (data.value[key].published === "true") {
                            data.value[key].images = data.mongoval[key].images;
                            $scope.listed_property.push(data.value[key]);
                        }else{
                            data.value[key].images = data.mongoval[key].images;
                            if(data.value[key].published === "step1"){
                                data.value[key].dynamic = 34;
                            }
                            if(data.value[key].published === "step2"){
                                data.value[key].dynamic = 67;
                            }
                            if(data.value[key].published === "step3"){
                                data.value[key].dynamic = 100;
                            }
                            $scope.inProgress_property.push(data.value[key]);
                        }
                    });
                    // data.mongoval data.value
                }
            })
            .error(function (err) {

            })
    }
    else if ($state.current.name === "users.listings.propert_requests") {
        $http.get("/usertrips/getTripsByHostId")
            .success(function (data) {
                debugger
                if (data.code === 200) {
                    debugger
                    $scope.propertyList = data.data;
                    $scope.acceptedPropertyList = [];
                    $scope.requestedPropertyList = [];
                    // $scope.listed_property = [];
                    angular.forEach($scope.propertyList, function (value, key) {
                        if ($scope.propertyList[key].tripstatus === "approved") {
                            $scope.acceptedPropertyList.push($scope.propertyList[key]);

                        } else if ($scope.propertyList[key].tripstatus === "pending") {
                            $scope.requestedPropertyList.push($scope.propertyList[key]);
                        }
                    });
                    // // data.mongoval data.value
                }
            })
            .error(function (err) {

            })
    }


}]);