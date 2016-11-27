app.controller('profileController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', 'Upload', 'Notification', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload, Notification) {
    $scope.profile_menus = [
        {
            name: "Dashboard",
            id: "dashboard-item"
        }, 
        {
            name: "Your Listing",
            id: "rooms-item"
        }, 
        {
            name: "Your Trips",
            id: "your-trips-item"
        }, 
        {
            name: "Profile",
            id: "user-profile-item"
        }, 
        {
            name: "Account",
            id: "account-item"
        }
    ];
    $scope.selected = 3;

    $scope.selectMenu= function(index) {
       $scope.selected = index; 
    };
    $scope.getUser = function () {
        $http.get("/users/profile")
            .success(function (data) {
                debugger
                if (data.code === 200) {
                    console.log(data.user);
                    $scope.user_info = data.user;
                    $scope.birthday = $scope.user_info.birthdate.split("/");
                    $scope.user_info.currency = "USD";
                    $scope.user_info.language = "en";

                } else if (data.code === 401) {
                    Notification.error(data.valule);
                }
            })
            .error(function (err) {

            })
    };
    $scope.profileImage = "images/user_pic-225x225.png";
    $scope.upload_profile_pic = function (file) {
        debugger
        if (file && file.length) {
            $scope.profileImage = file[0];
        }
    }
    $scope.updateProfile = function () {
        $scope.user_info.birthdate = $scope.birthday.join("/");
        $http.post("/users/update_profile", $scope.user_info)
            .success(function (data) {
                debugger
                if (data.code === 200) {
                    Notification.success("Profile Updated Successfully.");
                    // console.log(data.user);
                    // $scope.user_info = data.user;
                    // $scope.birthday = $scope.user_info.birthdate.split("/");

                } else if (data.code === 401) {
                    Notification.error(data.valule);
                }
            })
            .error(function (err) {

            })
    }
}]);
