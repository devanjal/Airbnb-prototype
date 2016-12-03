var app = angular.module("airbnb", ['ui.router', 'ngProgress', 'ui.bootstrap', 'ui-notification','ngFileUpload']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'NotificationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, NotificationProvider) {

    NotificationProvider.setOptions({
        delay: 2000,
        positionX: 'center',
        positionY: 'top'
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
        .state("search", {
            url: '/search',
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
        .state("users.trips", {
            url: '/trips',
            templateUrl: 'tripsPage/usertrips.html',
            controllerUrl: "tripsPage/tripController"
        })
        .state("users.trips.edit", {
            url: '/edit?id',
            templateUrl: 'tripsPage/editTrips.html',
            controllerUrl: "tripsPage/tripController"
        })
        .state("users.trips.preview", {
            url: '/preview?id',
            templateUrl: 'tripsPage/previewTrips.html',
            controllerUrl: "tripsPage/tripController"
        })
        
        ;

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);

}]);

app.controller('indexController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        debugger
        if(toState.name.indexOf("become-a-host.")>-1){
            $scope.hideFooter = true;
        }else{
            $scope.hideFooter = false;
        }
    });
    $scope.profileImage_icon = "https://a2.muscache.com/defaults/user_pic-50x50.png?v=2";
    $scope.checkStatus = function () {
        debugger
        if (window.sessionStorage.login_status === "true") {
            $scope.loginStatus = true;
            $scope.user = JSON.parse(window.sessionStorage.user_info);
        } else {
            window.sessionStorage.login_status = "false";
            $scope.loginStatus = false;
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
    }
}]);

app.controller('signupController', function ($scope, $uibModalInstance, $http, $uibModal) {

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
    debugger

    $scope.loginalerts = [];

    $scope.closeLoginAlert = function (index) {
        $scope.loginalerts.splice(index, 1);
    }

    $scope.login = function () {
        debugger
        $http.post("/users/login", $scope.user)
            .success(function (data) {
                debugger
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