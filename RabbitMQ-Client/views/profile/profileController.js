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

    $scope.editProfileMenus = [
        {
            name: "Edit Profile",
            link: "users.edit"
        },
        {
            name: "Photos, Symbol, and Video",
            link: "users.edit.media"
        },
        {
            name: "Trust and Verification",
            link: "/"
        },
        {
            name: "Reviews",
            link: "users.edit.review"
        },
        {
            name: "References",
            link: "/"
        },
    ]

    $scope.selected = 3;
    $scope.selectedEditMenu = 0;
    $scope.selectMenu = function (index) {
        $scope.selected = index;
    };
    $scope.selectEditMenu = function (index) {
        $scope.selectedEditMenu = index;
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
                    $scope.profileImage = data.user.profile_image;
                    $scope.$parent.$parent.profileImage_icon = data.user.profile_image;
                } else if (data.code === 401) {
                    Notification.error(data.valule);
                }
            })
            .error(function (err) {

            })
    };
    //$scope.profileImage = "images/user_pic-225x225.png";
    $scope.upload_profile_pic = function (file) {
        debugger
        if (file && file.length) {
            $scope.profileImage = file[0];
            Upload.upload({
                url: '/users/upload_profile_pic',
                file: $scope.profileImage
            }).success(function (data) {
                if (data.status === "success") {
                    $scope.secondStepStatus = "complete";
                    $scope.firstStepStatus = "complete";
                    $state.go('become-a-host');
                    // $scope.property = {};
                } else if (data.error) {
                    Notification.error(data.error);
                    console.log(JSON.stringify(data));
                }
            })
            .error(function (err) {
                console.log(err);
            })
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
