app.controller('propertyController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal','$stateParams', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, $stateParams) {

            $scope.methods = {};

            $scope.openGallery = function(){
                //console.log("I came in open gallery function()");
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
            //rating functions
            $scope.rate = 5;
            $scope.max = 5;
            $scope.isReadonly = true;
//calender functions
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

    $scope.dropdown1=["1 guest","2 guests","3 guests","4 guests","5 guests","6 guests","7 guests","8 guests","9 guests","10 guests","11 guests","12 guests","13 guests","14 guests","15 guests","16+ guests"];
    $scope.dropdownDefault=$scope.dropdown1[0];

    debugger
            console.log($stateParams.id);

            $scope.fetchData=function(){


                    $http({
                        url:"/property/searchbypropertyid",
                        method:"post",
                        data:{
                            id:$stateParams.id
                        }
                    }).success(function(data){
                        console.log("I m in success of searchbypropertyid angular");
                        console.log(data);
                        //console.log(data.value.title);
                        console.log(data.value[0].title);
                       $scope.propertyDetails = data.value[0];
                       console.log(data.value[0].images);
                       //console.log("this is value of tempImages:"+tempimages);

                      for(var i=0;i<data.value[0].images.length;i++){
                           var temp=new Array();
                           temp.push(data.value[0].images[i]);

                       }

                      // $scope.images=data.value[0].images;
                        $scope.images = [
                            {

                                url : temp[0]
                                // url : 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793_960_720.jpg',

                                //
                            },
                            {
                                url : temp[1]
                            }

                        ];



                    });


            };
}]);



