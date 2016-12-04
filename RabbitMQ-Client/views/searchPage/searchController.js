app.controller('searchController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal','$stateParams','$filter',function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, $stateParams, $filter) {
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
    $scope.dropdownDefault=$stateParams.guests;

    //Price Slider
    $scope.slider = {
        min: 100,
        max: 180,
        options: {
            floor: 10,
            ceil: 500
        }
    };

    debugger
    console.log($stateParams.location);
    console.log($stateParams.checkout);
    console.log($stateParams.checkin);
    console.log($stateParams.guests);

    var locationarr=new Array();

    $scope.fetchData=function(){
        debugger

        var myCenter = new google.maps.LatLng(37.3382, -121.8863);
        var geocoder = new google.maps.Geocoder();

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            cemter:myCenter,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        var infoWindow = new google.maps.InfoWindow();

        var marker = new google.maps.Marker({
                position: myCenter,
                map: map,
                clickable: true,
        });

        var circle = new google.maps.Circle({
            map: map,
            radius: 16093    // 10 miles in metres
            //fillColor: '#000000'
        });
        circle.bindTo('center', marker, 'position');


            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent("hi");
                infoWindow.open(map, this);
            });
            google.maps.event.addListener(map, 'click', function () {
            infoWindow.close();
        });
        if($stateParams.location==undefined && $stateParams.checkout == undefined && $stateParams.checkin == undefined){

            $http({
                url:"/property/searchAllProperties",
                method:"post",
                data:{

                }
            }).success(function(data){
                console.log("I m in success of searchAllProperties angular");
                $scope.propertyList=data.value;
                $scope.addresses= [];
                for(var i=0;i<data.value.length;i++){
                    $scope.addresses[i]=data.value[i].propertyaddress + ", " + data.value[i].city + ", " + data.value[i].state + ", " + data.value[i].country;
                }
                debugger
                geocoder = new google.maps.Geocoder();
                angular.forEach($scope.addresses, function (value, key) {
                    geocoder.geocode({ 'address': $scope.addresses[key] }, function (results, status) {
                        console.log(results);
                        if (status == 'OK') {
                            map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                            marker.addListener('click',function(){
                                infoWindow.setContent("$"+($scope.propertyList[key].price).toString());
                                infoWindow.open(map,marker);
                            })
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                })
            });
        }

        else if($stateParams.location !== undefined && $stateParams.checkout == undefined && $stateParams.checkin == undefined){

            locationarr=$stateParams.location.split(", ");

            $http({
                url:"/property/searchbycity",
                method:"post",
                data:{
                    city:locationarr[0],
                    state:locationarr[1],
                }
            }).success(function(data){
                console.log("I m in success of searchbycity angular");
                $scope.propertyList=data.value;
                $scope.addresses= [];


                for(var i=0;i<data.value.length;i++){
                    $scope.addresses[i]=data.value[i].propertyaddress + ", " + data.value[i].city + ", " + data.value[i].state + ", " + data.value[i].country;
                }
                debugger
                geocoder = new google.maps.Geocoder();
                angular.forEach($scope.addresses, function (value, key) {
                    geocoder.geocode({ 'address': $scope.addresses[key] }, function (results, status) {
                        console.log(results);
                        if (status == 'OK') {
                            map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                            marker.addListener('click',function(){
                                infoWindow.setContent("$"+($scope.propertyList[key].price).toString());
                                infoWindow.open(map,marker);
                            })
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                })
            });
        }
        else if($stateParams.location !== undefined && $stateParams.checkout !== undefined && $stateParams.checkin !== undefined){

            locationarr=$stateParams.location.split(", ");

            $http({
                url:"/property/searchbyquery",
                method:"post",
                data:{
                    city:locationarr[0],
                    state:locationarr[1],
                    checkin:$stateParams.checkin,
                    checkout:$stateParams.checkout,
                    guests:$stateParams.guests
                }
            }).success(function(data){
                console.log("I m in success of searchbycity angular");
                $scope.propertyList=data.value;
                $scope.addresses= [];


                for(var i=0;i<data.value.length;i++){
                    $scope.addresses[i]=data.value[i].propertyaddress + ", " + data.value[i].city + ", " + data.value[i].state + ", " + data.value[i].country;
                }
                debugger
                geocoder = new google.maps.Geocoder();
                angular.forEach($scope.addresses, function (value, key) {
                    geocoder.geocode({ 'address': $scope.addresses[key] }, function (results, status) {
                        console.log(results);
                        if (status == 'OK') {
                            map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                            marker.addListener('click',function(){
                                infoWindow.setContent("$"+($scope.propertyList[key].price).toString());
                                infoWindow.open(map,marker);
                            })
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                })
            });


        }
    };
    $scope.entirehome=false;
    $scope.entireHome=function(){
        $scope.entirehome=true;
        $http({
            url:"/property/searchbycategory",
            method:"post",
            data:{
                city:locationarr[0],
                state:locationarr[1],
                category:"entire_home"
            }
        }).success(function(data){
            console.log("I m in success of searchbycategory angular");
            $scope.propertyList=data.value;
        });

        console.log("entire home is selected");

    }
    $scope.privateroom=false;
    $scope.privateRoom=function(){
        $scope.privateroom=true;
        $http({
            url:"/property/searchbycategory",
            method:"post",
            data:{
                city:locationarr[0],
                state:locationarr[1],
                category:"private_room"
            }
        }).success(function(data){
            console.log("I m in success of searchbycategory angular");
            $scope.propertyList=data.value;
        });

        console.log("privateRoom is selected");
    }
    $scope.shared_room_checkbox=false;
    $scope.sharedRoom=function(){
        $scope.shared_room_checkbox=true;
        $http({
            url:"/property/searchbycategory",
            method:"post",
            data:{
                city:locationarr[0],
                state:locationarr[1],
                category:"shared_room"
            }
        }).success(function(data){
            console.log("I m in success of searchbycategory angular");
            $scope.propertyList=data.value;
        });
        console.log("shared_room_checkbox is selected");
    }
}]);