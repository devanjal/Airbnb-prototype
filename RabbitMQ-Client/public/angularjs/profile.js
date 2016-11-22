var profile = angular.module('profile', []);

//defining the login controller
profile.controller('profile', function($scope, $http,$window) {
    $http.get("/getProfile").success(function(data) {

        $scope.first_name=data.first_name;
        $scope.last_name=data.last_name;
        $scope.email=data.email;
        $scope.month=data.month;
        $scope.day=data.day;
        $scope.year=data.year;
        $scope.gender=data.gender;
        $scope.phone=data.phone;
        $scope.currency=data.currency;
        $scope.location=data.location;
        $scope.language=data.language;
        $scope.birthday=data.birthday;
        $scope.about=data.about;

       // alert($scope.x);
    });
    $scope.submit = function() {
        $http({
            method : "POST",
            url : '/profile',
            data : {
                "first_name":$scope.first_name,
                "last_name":$scope.last_name,
                "phone":$scope.phone,
                "gender":$scope.gender,
                "language":$scope.language,
                "currency":$scope.currency,
                "month":$scope.month,
                "year":$scope.year,
                "day":$scope.day,
                "email":$scope.email,
                "location":$scope.location,
                "about":$scope.about


            }
        }).success(function(data) {
            //checking the response data for statusCode
            if (data.statuscode==401) {
                $scope.invalid_login = false;
                $scope.validlogin = true;
                alert("invalid Input")
                $window.location.assign("/profile");;
            }
            else
            {
                $scope.invalid_login=true;
                $scope.validlogin=false;
               // alert("successfull Input")
                $window.location.assign("/profile");

                alert("Profile Setup Successful!!!!")

            }
        }).error(function(error) {
            console.log(error);
        });
    };
});
var checkProfile = angular.module('checkProfile', []);
checkProfile.controller('checkProfile', function($scope, $http,$window) {
        $http.get("/checkProfile").success(function (data) {
            $scope.test = data;
            $scope.first_name = data.first_name;
            $scope.last_name = data.last_name;
            $scope.email = data.email;
            $scope.month = data.month;
            $scope.day = data.day;
            $scope.year = data.year;
            $scope.location = data.location;

            alert($scope.x);
        });
    }
);