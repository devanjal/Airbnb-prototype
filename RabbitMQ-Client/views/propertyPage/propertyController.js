app.controller('propertyController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', '$stateParams', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, $stateParams) {

    $scope.methods = {};

    $scope.openGallery = function () {
        //console.log("I came in open gallery function()");
        $scope.methods.open();
    };

    // Similar to above function
    $scope.closeGallery = function () {
        $scope.methods.close();
    };

    $scope.nextImg = function () {
        $scope.methods.next();
    };

    $scope.prevImg = function () {
        $scope.methods.prev();
    };
    //rating functions
    $scope.rate = 5;
    $scope.max = 5;
    $scope.isReadonly = true;
    //calender functions
    $scope.format = 'MM-dd-yyyy';
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

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.dropdown1 = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 guests", "8 guests", "9 guests", "10 guests", "11 guests", "12 guests", "13 guests", "14 guests", "15 guests", "16+ guests"];
    $scope.dropdownDefault = $scope.dropdown1[0];

    // debugger
    // console.log($stateParams.id);

    $scope.fetchData = function () {
        debugger
        $http({
            url: "/property/searchbypropertyid",
            method: "post",
            data: {
                id: $stateParams.id
            }
        }).success(function (data) {
            debugger
            
            $scope.propertyDetails = data.value[0];
            
            
            var images = data.value[0].images;
            var tmpObj = {};
            var tmpImgArray=[];
            for (var i = 1; i < images.length; i++) {
                tmpObj["url"] = images[i];
                // tmpObj["title"] = i;
                tmpImgArray.push(tmpObj);
                tmpObj = {};
            }
            $scope.images = tmpImgArray;
            // $scope.images = [
            //     {
            //         url: temp[0]

            //     },
            //     {
            //         url: temp[1]
            //     }
            // ];
        });
    };
}]);



