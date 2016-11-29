app.controller('hostController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', 'Upload','Notification', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload,Notification) {
    $scope.firstStepStatus = "incomplete";
    $scope.secondStepStatus = "incomplete";
    $scope.thirdStepStatus = "incomplete";
    $scope.property = {};
    $scope.quantity = 1;
    $scope.photos = [];
    $scope.activeDecrement = false;
    $scope.continue = function () {
        //debugger
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
//--calendar functions-----------------
    $scope.format='MM-dd-yyyy';
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
//-------------------------------------
    $scope.deletePhoto = function (index) {
        $scope.photos.splice(index, 1);
    }

    $scope.uploadFiles = function (files) {
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

    $scope.firststepFinish = function () {
        $scope.property.quantity = $scope.quantity;
        $http.post("/become_host/step1", $scope.property)
        .success(function (data) {
            if (data.status === "success") {
                $scope.firstStepStatus = "complete";
                $state.go('become-a-host');
                // $scope.property = {};
            } else if (data.error) {
                console.log(JSON.stringify(data));
            }
        })
        .error(function (err) {
            console.log(err);
        })
    };

    $scope.secondstepFinish = function () {
        Upload.upload({
            url: '/become_host/step2',
            fields: $scope.property,
            file: $scope.photos
            // data: {files: $scope.photos, 'property': $scope.property}
        }).success(function (data) {
            if (data.status === "success") {
                $scope.secondStepStatus = "complete";
                $scope.firstStepStatus = "complete";
                $state.go('become-a-host');
                // $scope.property = {};
            } else if(data.error) {
                 Notification.error(data.error);
                console.log(JSON.stringify(data));
            }
        })
        .error(function (err) {
            console.log(err);
        })

    };

    $scope.thirdstepFinish = function(){
        debugger
        console.log($scope.property);
        $http.post("/become_host/step3", $scope.property)
        .success(function (data) {
            if (data.status === "success") {
                $scope.firstStepStatus = "complete";
                $scope.secondStepStatus = "complete";
                $scope.thirdStepStatus = "complete";
                $state.go('become-a-host.publish');

                // $scope.property = {};
            } else if (data.error) {
                console.log(JSON.stringify(data));
            }
        })
        .error(function (err) {
            console.log(err);
        })
    };

    $scope.publish = function(){
        console.log($scope.property);
        $http.post("/become_host/publish")
        .success(function (data) {
            if (data.status === "success") {
                Notification.success("Your property has been successfully listed.");
                $state.go('users.show');
            } else if (data.error) {
                console.log(JSON.stringify(data));
            }
        })
        .error(function (err) {
            console.log(err);
        })
    };




    $scope.incrementQuantity = function () {
        $scope.quantity = $scope.quantity + 1;
        if ($scope.quantity > 1) {
            $scope.activeDecrement = true;
        }

    };

    $scope.decrementQuantity = function () {
        $scope.quantity = $scope.quantity - 1;
        if ($scope.quantity === 1) {
            $scope.activeDecrement = false;
        }
    };


}]);