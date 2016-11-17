var app = angular.module("airbnb", ['ui.router', 'ngProgress', 'ui.bootstrap', 'ui-notification']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'NotificationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, NotificationProvider) {

    NotificationProvider.setOptions({
        delay: 2000,
        // startTop: 20,
        // startRight: 10,
        // verticalSpacing: 20,
        // horizontalSpacing: 20,
        positionX: 'center',
        positionY: 'top'
    });

    $stateProvider
        .state("/", {
            url: '/',
            templateUrl: 'default/default.html'
        })
        // .state("SignIn", {
        //     url: '/SignIn',
        //     templateUrl: 'signin-register/signin.html',
        //     controllerUrl: "signin-register/signinController"
        // })
        // .state("Register", {
        //     url: '/Register',
        //     templateUrl: 'signin-register/signin.html',
        //     controllerUrl: "signin-register/signinController"
        // })
        // .state("MyAccount", {
        //     url: '/MyAccount',
        //     templateUrl: 'Profile/MyProfile.html',
        //     controllerUrl: "Profile/profileController"
        // })
        // .state("Sell", {
        //     url: '/Sell',
        //     templateUrl: 'Sellitems/sell.html',
        //     controllerUrl: "Sellitems/sellController"
        // })
        // .state("market", {
        //     url: '/market?category',
        //     templateUrl: 'eBayMarket/market.html',
        //     controllerUrl: "eBayMarket/marketController"
        // })
        // .state("product", {
        //     url: '/product?pid',
        //     templateUrl: 'eBayProduct/product.html',
        //     controllerUrl: "eBayProduct/productController"
        // })
        // .state("Cart", {
        //     url: '/Cart',
        //     templateUrl: 'eBayCart/cart.html',
        //     controllerUrl: "eBayCart/cartController"
        // })
        // .state("checkout", {
        //     url: '/checkout',
        //     templateUrl: 'eBayCheckout/checkout.html',
        //     controllerUrl: "eBayCheckout/checkoutController"
        // })
        ;

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);

}]);

app.controller('indexController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal) {

    $scope.openSignup = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'signupmodal.html',
            controller: 'signupController',
            windowClass: "signupmodal",
            resolve: {

            }
        });
    };

    $scope.openLogin = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'loginmodal.html',
            controller: 'loginController',
            windowClass: "loginmodal",
            resolve: {

            }
        });
    };
}]);

app.controller('signupController', function ($scope, $uibModalInstance, $http) {

    debugger
    $scope.registeralerts = [];
    $scope.showSignupForm = false;
    $scope.registerUser = {};
    $scope.signup = function () {
        debugger
        $scope.showSignupForm = true;
    }

    $scope.back = function () {
        $scope.showSignupForm = false;
    }
    
    $scope.closeRegisterAlert = function (index) {
        $scope.registeralerts.splice(index, 1);
    }

    $scope.register = function () {
        debugger
        console.log($scope.registerUser);

        $http.post("/users/register", $scope.registerUser)
            .success(function (data) {
                debugger
                console.log(data);
                if (data.error) {
                    // $scope.error = true;
                    $scope.registeralerts = [{ type: 'danger', msg: data.error }];

                } else if (data.errors) {
                    // $scope.error = true;
                    $scope.alerts = [data.errors.message];

                }
                else if (data.status) {
                    $scope.registeralerts = [{ type: 'success', msg: "Successfully Registered" }];
                    $scope.registerUser = {};
                }
            })
            .error(function (err) {

            })
    }

});
app.controller('loginController', function ($scope, $uibModalInstance) {

});