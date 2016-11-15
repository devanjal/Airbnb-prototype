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

app.controller('indexController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', function ($scope, $http, ngProgress, $state, $rootScope) {

    // $scope.siginPage = false;
    // $scope.loginStatus = false;
    // $scope.numCartItems = 0;

    // $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //     if (!$scope.loginStatus) {
    //         $http.get('/login/status').
    //             success(function (data, status, headers, config) {
    //                 if (data.user) {
    //                     $scope.loginStatus = true;
    //                     $scope.firstname = data.user.firstname;
    //                     if (fromState === "Cart") {
    //                         $state.go('Cart');
    //                     }
    //                     if (toState.name === "SignIn" || toState.name === "Register") {
    //                         $state.go('/');
    //                     }
    //                 } else {
    //                     if (toState.name !== "Register") {
    //                         $state.go('SignIn');
    //                     }

    //                 }
    //                 // else if (toState.name === "MyAccount" || toState.name === "Sell" || toState.name === "checkout") {
    //                 //     $state.go('/');
    //                 // }
    //             }).
    //             error(function (data, status, headers, config) {

    //             });
    //     } else if ($scope.loginStatus) {
    //         if (toState.name === "SignIn" || toState.name === "Register") {
    //             $state.go('/');
    //         }
    //     }
    //     if (toState.name === "SignIn" || toState.name === "Register" || toState.name === "checkout") {
    //         $scope.siginPage = true;
    //     } else {
    //         $scope.siginPage = false;
    //     }
    // });

    // $scope.logout = function () {
    //     $http.get('/login/logout').
    //         success(function (data, status, headers, config) {
    //             if (data.status) {
    //                 $scope.loginStatus = false;
    //                 $state.go('/');
    //             }
    //         }).
    //         error(function (data, status, headers, config) {

    //         });
    // }

    // $scope.getCart = function () {
    //     $http.get("/ebayCart")
    //         .success(function (data) {
    //             if (data.status !== "noitem") {
    //                 $scope.numCartItems = data.length;
    //             }else{
    //                 $scope.numCartItems = 0;
    //             }
    //         })
    //         .error(function (err) {

    //         })
    // }

    // $scope.categories = {
    //     0: "All Categories",
    //     1: "Antiques",
    //     2: "Art",
    //     3: "Baby",
    //     4: "Books",
    //     5: "Business & Industrial",
    //     6: "Cameras & Photo",
    //     7: "Cell Phones & Accessories",
    //     8: "Clothing, Shoes & Accessories",
    //     9: "Coins & Paper Money",
    //     10: "Collectibles",
    //     11: "Computers/Tablets & Networking",
    //     12: "Consumer Electronics",
    //     13: "Crafts",
    //     14: "Dolls & Bears",
    //     15: "DVDs & Movies",
    //     16: "eBay Motors",
    //     17: "Entertainment Memorabilia",
    //     18: "Gift Cards & Coupons",
    //     19: "Health & Beauty",
    //     20: "Home & Garden",
    //     21: "Jewelry & Watches",
    //     22: "Music",
    //     23: "Musical Instruments & Gear",
    //     24: "Pet Supplies",
    //     25: "Pottery & Glass",
    //     26: "Real Estate",
    //     27: "Specialty Services",
    //     28: "Sporting Goods",
    //     29: "Sports Mem, Cards & Fan Shop",
    //     30: "Stamps",
    //     31: "Tickets & Experiences",
    //     32: "Toys & Hobbies",
    //     33: "Travel",
    //     34: "Video Games & Consoles",
    //     35: "Everything Else"
    // }

}]);