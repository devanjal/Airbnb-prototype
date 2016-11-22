app.controller('hostController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal) {
    $scope.firstStepStatus = "incomplete";
    $scope.secondStepStatus = "incomplete";
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
        }else{
            $state.go(".category");
        }
    };

    $scope.firststepFinish = function(){
        $scope.firstStepStatus = "complete";
        $state.go('become-a-host');
    }
    $scope.secondstepFinish = function(){
        $scope.secondStepStatus = "complete";
        $scope.firstStepStatus = "complete";
        $state.go('become-a-host');
    }

}]);