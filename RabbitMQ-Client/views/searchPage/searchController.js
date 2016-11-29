app.controller('searchController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal) {
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

    $scope.initMap= function(){
        debugger
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
    }
    $scope.getAllProperties=function(req,res){

    }
}]);