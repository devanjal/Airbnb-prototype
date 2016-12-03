app.controller('profileController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal', 'Upload', 'Notification', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal, Upload, Notification) {
    $scope.profile_menus = [
        {
            name: "Dashboard",
            id: "dashboard-item",
            link: "users"

        },
        {
            name: "Your Listing",
            id: "rooms-item",
            link: "users.listings"

        },
        {
            name: "Your Trips",
            id: "your-trips-item",
            link: "users.trips"
        },
        {
            name: "Profile",
            id: "user-profile-item",
            link: "users"
        },
        {
            name: "Account",
            id: "account-item",
            link: "users"
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

    if ($state.current.name === "users.listings") {
        debugger
        $http.get("/property/searchbyuserid")
            .success(function (data) {
                debugger
                if (data.code === 200) {
                    $scope.listed_property = [];
                    angular.forEach(data.value, function (value, key) {
                        if (data.value[key].published === "true") {
                            data.value[key].images = data.mongoval[key].images;
                            $scope.listed_property.push(data.value[key]);
                        }
                    });
                    // data.mongoval data.value
                }
            })
            .error(function (err) {

            })
    }

    $scope.selectMenu = function (index) {
        $scope.selected = index;
    };

    $scope.selectEditMenu = function (index) {
        $scope.selectedEditMenu = index;
    };

    $scope.getUser = function () {
        debugger

        // $scope.user_info = $scope.$parent.user;
        // $scope.birthday = $scope.user_info.birthdate.split("/");
        // $scope.user_info.currency = "USD";
        // $scope.user_info.language = "en";
        // $scope.profileImage = $scope.user_info.profile_image;

        // console.log($scope.$parent.user);
        // console.log($scope.$parent.$parent.user);



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
                    if (data.value.code) {
                        Notification.error(data.value.code);
                    } else {
                        Notification.error(data.value);
                    }

                }
            })
            .error(function (err) {

            })
    };

    $scope.upload_profile_pic = function (file) {
        debugger
        if (file && file.length) {
            $scope.profileImage = file[0];
            Upload.upload({
                url: '/users/upload_profile_pic',
                file: $scope.profileImage
            }).success(function (data) {
                if (data.code === 200) {
                    Notification.success("Successfully updated the profile image.");
                    $scope.$parent.$parent.profileImage_icon = data.src;
                    $scope.user_info.profile_image = data.src;
                } else if (data.error) {
                    Notification.error(data.error);
                    console.log(JSON.stringify(data));
                }
            })
                .error(function (err) {
                    console.log(err);
                })
        }
    };

    $scope.updateProfile = function () {
        $scope.user_info.birthdate = $scope.birthday.join("/");
        $http.post("/users/update_profile", $scope.user_info)
            .success(function (data) {
                debugger
                if (data.code === 200) {
                    Notification.success("Profile Updated Successfully.");
                } else if (data.code === 401) {
                    Notification.error(data.valule);
                }
            })
            .error(function (err) {

            })
    };
}]);
