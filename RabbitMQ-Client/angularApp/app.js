var app = angular.module("airbnb", ['ui.router', 'ngProgress', 'ui.bootstrap', 'ui-notification','ngFileUpload', 'thatisuday.ng-image-gallery']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'NotificationProvider','ngImageGalleryOptsProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, NotificationProvider, ngImageGalleryOptsProvider) {

    NotificationProvider.setOptions({
        delay: 2000,
        positionX: 'center',
        positionY: 'top'
    });

    ngImageGalleryOptsProvider.setOpts({
        thumbnails  :   false,
        inline      :   false,
        imgBubbles  :   false,
        bgClose     :   true,
        bubbles     :   true,
        imgAnim 	: 	'fadeup',
     });

    $stateProvider
        .state("/", {
            url: '/',
            templateUrl: 'default/default.html',
            controllerUrl: "default/defaultController"
        })
        .state("host", {
            url: '/host',
            templateUrl: 'hostPage/hostpage.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host", {
            url: '/become-a-host',
            templateUrl: 'hostPage/become_a_host.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host.category", {
            url: '/category',
            templateUrl: 'hostPage/category.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host.location", {
            url: '/location',
            templateUrl: 'hostPage/location.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host.bedrooms", {
            url: '/bedrooms',
            templateUrl: 'hostPage/bedrooms.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host.photos", {
            url: '/photos',
            templateUrl: 'hostPage/photos.html',
            controllerUrl: "hostPage/hostController"
        })

        .state("become-a-host.description", {
            url: '/description',
            templateUrl: 'hostPage/description.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host.calendar", {
            url: '/calendar',
            templateUrl: 'hostPage/hostCalendar.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host.choose-pricing-mode", {
            url: '/choose-pricing-mode',
            templateUrl: 'hostPage/choose-pricing-mode.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host.price", {
            url: '/price',
            templateUrl: 'hostPage/fixedPrice.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("become-a-host.publish", {
            url: '/publish',
            templateUrl: 'hostPage/readyToPublish.html',
            controllerUrl: "hostPage/hostController"
        })
        .state("searchQuery", {
            url: '/search?location&checkout&checkin&guests',
            templateUrl: 'searchPage/searchPage.html',
            controllerUrl: "searchPage/searchController"
        })
        .state("users", {
            url: '/users',
            templateUrl: 'profile/users.html',
            controllerUrl: "profile/profileController"
        })
        .state("users.edit", {
            url: '/edit',
            templateUrl: 'profile/editprofile.html',
            controllerUrl: "profile/profileController"
        })
        .state("users.edit.media", {
            url: '/media',
            templateUrl: 'profile/photo.html',
            controllerUrl: "profile/profileController"
        })
        .state("users.show", {
            url: '/show',
            templateUrl: 'profile/viewprofile.html',
            controllerUrl: "profile/profileController"
        })
        .state("individualProperty",{
            url:'/property?id',
            templateUrl:'propertyPage/IndividualPropertyPage.html',
            controllerUrl: "propertyPage/propertyController"


        })
        
        ;        
        
        // become-a-host.
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

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //debugger
        if(toState.name.indexOf("become-a-host.")>-1){
            $scope.hideFooter = true;
        }else{
            $scope.hideFooter = false;
        }
    });
    $scope.profileImage_icon = "https://a2.muscache.com/defaults/user_pic-50x50.png?v=2";
    $scope.checkStatus = function () {
        //debugger
        if (window.sessionStorage.login_status === "true") {
            $scope.loginStatus = true;
            $scope.user = JSON.parse(window.sessionStorage.user_info);
            // $scope.user_firstname
        } else {
            window.sessionStorage.login_status = "false";
            $scope.loginStatus = false;
            // $http.get("users/getInfo")
            // .success(function (data) {
            //     debugger

            // })
            // .error(function (err) {

            // })
        }
    }

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

    $scope.logout = function () {
        window.sessionStorage.login_status = "false";
        delete window.sessionStorage.user;
        window.location.reload();
        // $http.get("/users/logout")
        // .success(function (data) {
        //     debugger


        // })
        // .error(function (err) {

        // })
    }
}]);

app.controller('signupController', function ($scope, $uibModalInstance, $http, $uibModal) {

    //debugger
    $scope.registeralerts = [];
    $scope.showSignupForm = false;
    $scope.registerUser = {};
    $scope.signup = function () {
        //debugger
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
    };

    $scope.openLogin = function () {
        $uibModalInstance.dismiss('close');
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'loginmodal.html',
            controller: 'loginController',
            windowClass: "loginmodal",
            resolve: {

            }
        });

    }

});
app.controller('loginController', function ($scope, $uibModalInstance, $http, $uibModal) {
    //debugger

    $scope.loginalerts = [];

    $scope.closeLoginAlert = function (index) {
        $scope.loginalerts.splice(index, 1);
    }

    $scope.login = function () {
        //debugger
        $http.post("/users/login", $scope.user)
            .success(function (data) {
                //debugger
                if (data.status === "success") {
                    $uibModalInstance.dismiss('close');
                    window.sessionStorage.login_status = "true";
                    window.sessionStorage.user_info = JSON.stringify(data.user);
                    window.location.reload();
                    // $scope.$parent.loginStatus = true;
                    // $state.go('/');
                } else {
                    $scope.loginalerts = [{ type: 'danger', msg: data.error }];
                }
            })
            .error(function (err) {

            })
    }

    $scope.openSignup = function () {
        $uibModalInstance.dismiss('close');
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'signupmodal.html',
            controller: 'signupController',
            windowClass: "signupmodal",
            resolve: {

            }
        });
    }



});