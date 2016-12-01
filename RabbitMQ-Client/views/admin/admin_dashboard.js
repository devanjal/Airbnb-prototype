/**
 * Created by varsha on 11/28/2016.
 */
var app = angular.module('adminDashboardApp', ["chart.js"]);
app.controller('adminDashboardController', function ($scope, $http, $window) {

    $http({
        method : "POST",
        url : "http://localhost:80/admin/gettoprevenue",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {type:'property'}
    }).then(function mySucces(response) {
        labels = [];
        data = [];
        $window.alert(JSON.stringify(response.data))

        for(item in response.data.value)
        {

            labels.push(response.data.value[item].property_id);
            data.push(response.data.value[item].netrevenue);

        }
        $window.alert(labels)

        $window.alert(data)

        $scope.series = ['revenue'];
        $scope.labels = labels;
        $scope.data = [data];
    }, function myError(response) {
        // $scope.myWelcome = response.statusText;
    });

    $scope.hostDetails = [
        {
            firstname : "test",
            lastname : "test",
            email : "test"

        }
    ];
    $scope.options = {
        responsive: false,
        maintainAspectRatio: false,
        barDatasetSpacing: 1,
        barShowStroke: true,
        barStrokeWidth : 2,
        barValueSpacing : 5
    };
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.adminairbnb = function()
    {
        $window.alert("adminairbnb");
    }
    $scope.searchbill = function()
    {
        $window.alert("search bill");
    }
    $scope.searchhosts = function () {
        $window.alert("search hosts");
    }

    $scope.addhosts = function () {
        //$window.alert("add hosts");
        $http({
            method : "GET",
            url : "http://localhost:80/admin/gethostrequests",
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function mySucces(response) {

           // $window.alert("sdfsdfsdf");
            $scope.hostDetails = response.data;
            //$scope.logintime = response.data.logintime;
        }, function myError(response) {
            // $scope.myWelcome = response.statusText;
        });

    }
});