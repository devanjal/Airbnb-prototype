app.controller('hostController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', 'Upload', 'Notification', function($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload, Notification) {
    $scope.firstStepStatus = "incomplete";
    $scope.secondStepStatus = "incomplete";
    $scope.thirdStepStatus = "incomplete";
    $scope.property = {};
    $scope.property.country = "US";
    $scope.quantity = 1;
    $scope.photos = [];
    $scope.activeDecrement = false;
    $scope.priceMode = "fixed";
    // $scope.property.availability_from = new Date();
    // $scope.property.availability_to = new Date();

    if (sessionStorage.inProgress_property) {
        $scope.property = JSON.parse(sessionStorage.inProgress_property);
        delete sessionStorage.inProgress_property;
        $scope.property.description = $scope.property.propertydescription;
        if($scope.property.availability_from){
            $scope.fromDate = new Date($scope.property.availability_from);
            // date.setDate(date.getDate() + 1);
        }
        if($scope.property.availability_to){
            $scope.toDate = new Date($scope.property.availability_to);
            // date.setDate(date.getDate() + 1);
        }
        
        if ($scope.property.published === "step1") {
            $scope.firstStepStatus = "complete";
            $scope.secondStepStatus = "incomplete";
            $scope.thirdStepStatus = "incomplete";
        }
        else if ($scope.property.published === "step2") {
            $scope.firstStepStatus = "complete";
            $scope.secondStepStatus = "complete";
            $scope.thirdStepStatus = "incomplete";
        }
        else if ($scope.property.published === "step3") {
            $scope.firstStepStatus = "complete";
            $scope.secondStepStatus = "complete";
            $scope.thirdStepStatus = "complete";
        }
    }

    $scope.continue = function() {
        if (window.sessionStorage.login_status === "false" || window.sessionStorage.login_status === undefined) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'signupmodal.html',
                controller: 'signupController',
                windowClass: "signupmodal",
                resolve: {

                }
            });
        } else {
            $state.go(".category");
        }
    };

    //--calendar functions------------------------------------------------------
    $scope.format = 'MM-dd-yyyy'
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        showWeeks: true
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
    $scope.getFromDate = function (fromDate) {
        debugger
        console.log(fromDate);
        $scope.property.availability_from = fromDate;
       
    };
    $scope.getToDate = function (toDate) {
        debugger
        console.log(toDate);
        $scope.property.availability_to = toDate;
    };
    //--------------------------------------------------------------------------

    //uploading and deleting property images------------------------------------

    $scope.deletePhoto = function(index) {
        $scope.photos.splice(index, 1);
    }

    $scope.uploadFiles = function(files) {
        debugger
        if ($scope.photos) {
            if (files && files.length) {
                $scope.photos = $scope.photos.concat(files);
            }

        } else {
            $scope.photos = [];
            $scope.photos = files;
        }
        console.log(files);
    }
    //----------------------------------------------------------------------------

    //property listing functions--------------------------------------------------
    $scope.firststepFinish = function() {
        debugger
        $scope.property.quantity = $scope.quantity;
        if ($scope.property.propertyid) {
            $scope.property.property_id = $scope.property.propertyid;
            $http.post("/become_host/step1byid", $scope.property)
                .success(function(data) {
                    if (data.status === "success") {
                        $scope.firstStepStatus = "complete";
                        $state.go('become-a-host');
                    } else if (data.error) {
                        console.log(JSON.stringify(data));
                    }
                })
                .error(function(err) {
                    Notification.error("Unknown error. Please try again.");
                    console.log(err);
                })
        } else {
            $http.post("/become_host/step1", $scope.property)
                .success(function(data) {
                    if (data.status === "success") {
                        $scope.firstStepStatus = "complete";
                        $state.go('become-a-host');
                    } else if (data.error) {
                        console.log(JSON.stringify(data));
                    }
                })
                .error(function(err) {
                    console.log(err);
                })

        }
    };

    $scope.secondstepFinish = function() {
        if ($scope.property.propertyid) {
            $scope.property.property_id = $scope.property.propertyid;
            Upload.upload({
                url: '/become_host/step2byid',
                fields: $scope.property,
                file: $scope.photos
                // data: {files: $scope.photos, 'propertyPage': $scope.propertyPage}
            }).success(function(data) {
                if (data.status === "success") {
                    $scope.secondStepStatus = "complete";
                    $scope.firstStepStatus = "complete";
                    $state.go('become-a-host');
                    // $scope.propertyPage = {};
                } else if (data.error) {
                    Notification.error(data.error);
                    console.log(JSON.stringify(data));
                }
            })
                .error(function(err) {
                    console.log(err);
                })
        } else {
            Upload.upload({
                url: '/become_host/step2',
                fields: $scope.property,
                file: $scope.photos
                // data: {files: $scope.photos, 'propertyPage': $scope.propertyPage}
            }).success(function(data) {
                if (data.status === "success") {
                    $scope.secondStepStatus = "complete";
                    $scope.firstStepStatus = "complete";
                    $state.go('become-a-host');
                    // $scope.propertyPage = {};
                } else if (data.error) {
                    Notification.error(data.error);
                    console.log(JSON.stringify(data));
                }
            })
                .error(function(err) {
                    console.log(err);
                })
        }

    };

    $scope.thirdstepFinish = function() {
        debugger
        // $scope.propert.availability_from
        if ($scope.property.propertyid) {
            sessionStorage.inProgress_property = JSON.stringify($scope.property);
            $scope.property.property_id = $scope.property.propertyid;

            $http.post("/become_host/step3byid", $scope.property)
                .success(function(data) {
                    if (data.status === "success") {
                        $scope.firstStepStatus = "complete";
                        $scope.secondStepStatus = "complete";
                        $scope.thirdStepStatus = "complete";
                        $state.go('become-a-host.publish');

                        // $scope.propertyPage = {};
                    } else if (data.error) {
                        console.log(JSON.stringify(data));
                    }
                })
                .error(function(err) {
                    console.log(err);
                })
        } else {
            $http.post("/become_host/step3", $scope.property)
                .success(function(data) {
                    if (data.status === "success") {
                        $scope.firstStepStatus = "complete";
                        $scope.secondStepStatus = "complete";
                        $scope.thirdStepStatus = "complete";
                        $state.go('become-a-host.publish');

                        // $scope.propertyPage = {};
                    } else if (data.error) {
                        console.log(JSON.stringify(data));
                    }
                })
                .error(function(err) {
                    console.log(err);
                })
        }
    };

    $scope.publish = function() {
        console.log($scope.property);
        console.log($scope.toDate);
        console.log($scope.fromDate);
        if ($scope.property.propertyid) {
            $scope.property.property_id = $scope.property.propertyid;
            $http.post("/become_host/publishbyid",$scope.property)
                .success(function(data) {
                    if (data.status === "success") {
                        Notification.success("Your propertyPage has been successfully listed.");
                        delete sessionStorage.inProgress_property;
                        $state.go('users.listings');
                    } else if (data.error) {
                        console.log(JSON.stringify(data));
                    }
                })
                .error(function(err) {
                    console.log(err);
                })
        } else {
            $http.post("/become_host/publish")
                .success(function(data) {
                    if (data.status === "success") {
                        Notification.success("Your propertyPage has been successfully listed.");
                        delete sessionStorage.inProgress_property;
                        $state.go('users.listings');
                    } else if (data.error) {
                        console.log(JSON.stringify(data));
                    }
                })
                .error(function(err) {
                    console.log(err);
                })
        }
    };
    //----------------------------------------------------------------------------

    $scope.incrementQuantity = function() {
        $scope.quantity = $scope.quantity + 1;
        if ($scope.quantity > 1) {
            $scope.activeDecrement = true;
        }

    };

    $scope.decrementQuantity = function() {
        $scope.quantity = $scope.quantity - 1;
        if ($scope.quantity === 1) {
            $scope.activeDecrement = false;
        }
    };


}]);