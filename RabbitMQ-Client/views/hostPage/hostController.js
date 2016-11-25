app.controller('hostController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal) {
    $scope.firstStepStatus = "incomplete";
    $scope.secondStepStatus = "incomplete";
    $scope.property = {};
    $scope.quantity = 1;
    $scope.activeDecrement = false;
    $scope.continue = function () {
        debugger
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

    $scope.firststepFinish = function () {
        $scope.property.quantity = $scope.quantity;
        $http.post("/become_host/step1", $scope.property)
            .success(function (data) {
                if (data.status === "success") {
                    $scope.firstStepStatus = "complete";
                    $state.go('become-a-host');
                    $scope.property = {};
                } else if (data.error) {
                    console.log(JSON.stringify(data));
                }
            })
            .error(function (err) {
                console.log(err);
            })
    };

    $scope.secondstepFinish = function () {
        $http.post("/become_host/step2", $scope.property)
            .success(function (data) {
                if (data.status === "success") {
                    $scope.secondStepStatus = "complete";
                    $scope.firstStepStatus = "complete";
                    $state.go('become-a-host');
                    $scope.property = {};
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