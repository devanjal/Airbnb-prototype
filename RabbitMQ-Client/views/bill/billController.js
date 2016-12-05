app.controller('billController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', 'Upload', 'Notification', function($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload, Notification) {
    debugger
    if ($state.current.name === "users.account") {
        $scope.selectedAccountMenu = 1;
    } else {
        $scope.selectedAccountMenu = 0;
    }

    $scope.accountMenus = [
        {
            name: "Payment Methods",
            link: "users.account.payment_method"

        },
        {
            name: "Bill History",
            link: "users.account"

        },
    ]

    $scope.selectAccountMenu = function(index) {
        $scope.selectedAccountMenu = index;
    };

    if ($state.current.name === "users.account") {
        $http.get("/bill/getBillByHid")
            .success(function(data) {
                debugger
                if (data.status === "success") {
                    console.log(data.result);
                    $scope.billDetails = data.result;
                } else if (data.status === "error") {
                    Notification.error(data.error);
                }
            })
            .error(function(err) {

            })
    }
    if ($state.current.name === "users.account.bill") {
        $http.post("/bill/getByBillId", { bill_id: $state.params.id })
            .success(function(data) {
                debugger
                if (data.status === "success") {
                    console.log(data.result[0]);
                    $scope.billData = data.result[0];
                } else if (data.status === "error") {
                    Notification.error(data.error);
                }
            })
            .error(function(err) {

            })
    }
    $scope.open = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'paymentModal.html',
            controller: 'paymentController',
            // windowClass: "signupmodal",
            resolve: {

            }
        });
    };
}]);

app.controller('paymentController', function($scope, $uibModalInstance, $http, $uibModal) {
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
