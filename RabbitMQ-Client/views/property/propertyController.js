app.controller('propertyController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal) {
            $scope.images = [
                {
                    title : 'This is amazing photo of nature',
                    alt : 'amazing nature photo',
                    thumbUrl : "../public/images/upload_5a0641f031acebfe76f478dd2ac75929",
                    url : 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793_960_720.jpg',
                    extUrl : 'http://mywebsitecpm/photo/1453793'
                   //
                },
                {
                    url : 'https://pixabay.com/static/uploads/photo/2016/06/10/22/25/ortler-1449018_960_720.jpg'
                }

            ];
            $scope.methods = {};

            $scope.openGallery = function(){
                console.log("I came in open gallery function()");
                $scope.methods.open();
            };

        // Similar to above function
            $scope.closeGallery = function(){
                $scope.methods.close();
            };

            $scope.nextImg = function(){
                $scope.methods.next();
            };

            $scope.prevImg = function(){
                $scope.methods.prev();
            };


            $scope.rate = 5;
            $scope.max = 5;
            $scope.isReadonly = false;

            $scope.searchAllProperties
}]);


