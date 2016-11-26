app.controller('profileController', ['$scope', '$http', 'ngProgress', '$state', '$rootScope', '$uibModal','Notification', function ($scope, $http, ngProgress, $state, $rootScope, $uibModal,Notification) {
    $scope.getUser = function(){
        $http.get("/users/profile")
        .success(function(data){
            debugger
            if(data.code === 200){
                console.log(data.user);
                $scope.user_info = data.user;
                $scope.birthday = $scope.user_info.birthdate.split("/");
                $scope.user_info.currency = "USD";
                $scope.user_info.language = "en";

            }else if(data.code === 401){
                Notification.error(data.valule);
            }
        })
        .error(function(err){

        })
    };

    $scope.updateProfile = function(){
        $scope.user_info.birthdate = $scope.birthday.join("/");
        $http.post("/users/update_profile",$scope.user_info)
        .success(function(data){
            debugger
            if(data.code === 200){
                Notification.success("Profile Updated Successfully.");
                // console.log(data.user);
                // $scope.user_info = data.user;
                // $scope.birthday = $scope.user_info.birthdate.split("/");

            }else if(data.code === 401){
                Notification.error(data.valule);
            }
        })
        .error(function(err){

        })
    }
}]);
