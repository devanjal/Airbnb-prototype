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

    /*$scope.initMap= function(){
        //debugger
        //console.log("I came here in init angular");
        var uluru = {lat: 36.9741, lng: -122.0308};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: uluru,
            mapTypeId: 'roadmap'
        });

        var infoWindow = new google.maps.InfoWindow();

        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            clickable:true,
        });
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent("hi");
            infoWindow.open(map,this);
        });
        google.maps.event.addListener(map, 'click', function() {
            infoWindow.close();

        });
    }*/

    $scope.dropdown1=["1 guest","2 guests","3 guests","4 guests","5 guests","6 guests","7 guests","8 guests","9 guests","10 guests","11 guests","12 guests","13 guests","14 guests","15 guests","16+ guests"];
    $scope.dropdownDefault=$stateParams.guests;

    /*$scope.checkin=$stateParams.checkin;
    $scope.checkout=$stateParams.checkout;*/

    debugger
    console.log($stateParams.location);
    console.log($stateParams.checkout);
    console.log($stateParams.checkin);
    console.log(new Date($stateParams.checkin));
    console.log($stateParams.guests);

    var locationarr=new Array();

    $scope.fetchData=function(){
        debugger

        var uluru = {lat: 36.9741, lng: -122.0308};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: uluru,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        var infoWindow = new google.maps.InfoWindow();

        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            clickable:true,
        });
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent("hi");
            infoWindow.open(map,this);
        });
        google.maps.event.addListener(map, 'click', function() {
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
                //console.log(data.value[0].propertyid);


            })
        }
        else if($stateParams.location !== undefined && $stateParams.checkout == undefined && $stateParams.checkin == undefined){

            locationarr=$stateParams.location.split(", ");

            $http({
                url:"/property/searchbycity",
                method:"post",
                data:{
                    city:locationarr[0],
                    state:locationarr[1]
                }
            }).success(function(data){
                console.log("I m in success of searchbycity angular");
                $scope.propertyList=data.value;


            })
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