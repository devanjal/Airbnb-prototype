
var app = angular.module('hostAnalyticsPageApp', ["chart.js"]);
app.controller('hostAnalyticsPageController', function ($scope, $http, $window) {
    $scope.colours = ["rgba(224, 108, 112, 1)",
        "rgba(224, 108, 112, 1)",
        "rgba(224, 108, 112, 1)"]
    $scope.datasetOverride = [
        {
            fill: true,
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        },
        {
            fill: true,
            backgroundColor: [
                "#803690",
                "#46BFBD",
                "#FDB45C"
            ]
        }];
    $http({
        method : "POST",
        url : "/host/getprofitableproperties",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {type:'property'}
    }).then(function mySucces(response) {
        labels = [];
        data = [];

        labels_pi = [];
        data_pi = [];

        //$window.alert(JSON.stringify(response.data))

        for(item in response.data.value)
        {
            labels_pi.push(response.data.value[item].title);
            data_pi.push((parseInt(response.data.value[item].netrevenue) * 30/100));

            labels.push(response.data.value[item].title);
            data.push(response.data.value[item].netrevenue);

        }
        //$window.alert(labels)

        //$window.alert(data)

        $scope.series = ['property top revenue'];
        $scope.labels = labels;
        $scope.data = [data];

        $scope.labels_pi = labels_pi;
        $scope.data_pi = [data_pi];
    }, function myError(response) {
        // $scope.myWelcome = response.statusText;
    });
    $http({
        method : "POST",
        url : "/host/getleastprofitableproperties",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {type:'property'}
    }).then(function mySucces(response) {
        labels_l = [];
        data_l = [];
        //$window.alert(JSON.stringify(response.data))

        for(item in response.data.value)
        {

            labels_l.push(response.data.value[item].title);
            data_l.push(response.data.value[item].netrevenue);

        }
        //$window.alert(labels)

        //$window.alert(data)

        $scope.series_l = ['property top revenue'];
        $scope.labels_l = labels_l;
        $scope.data_l = [data_l];


    }, function myError(response) {
        // $scope.myWelcome = response.statusText;
    });

    $scope.options = {
        responsive: false,
        maintainAspectRatio: false,
        barDatasetSpacing: 1,
        barShowStroke: true,
        barStrokeWidth : 2,
        barValueSpacing : 5
    };
    $scope.labels = [];
    $scope.series = [];

    $scope.data = [
        ];
    $scope.labels_l = [];
    $scope.series_l = [];

    $scope.data_l = [
    ];

    $scope.labels_pi = [];
    $scope.data_pi = [];
});