angular.module('PlayTask', [
    'templates-app',
    'templates-common',
    'ui.router',
    'angular.filter'
])

// .config(function myAppConfig($stateProvider, $urlRouterProvider) {
//     $urlRouterProvider.otherwise('/');
// })
//
// .run(function run() {
// })

    .controller('AppCtrl', ["$scope", "$http", "$filter", function AppCtrl($scope, $http, $filter) {

        var url = 'https://pure-falls-1534.herokuapp.com/';

        //load profile data
        $http({
            method: 'GET',
            url: url + 'profile'
        }).then(function successCallback(response) {
            $scope.profile = response.data;
        }, function errorCallback(response) {
            console.log('failed to load profile');
        });

        //load activity data
        $http({
            method: 'GET',
            url: url + 'activityfeed'
        }).then(function successCallback(response) {
            //change date format
            if (response.data && response.data.feed) {
                angular.forEach(response.data.feed, function (value, key) {
                    angular.forEach(value, function (value1, key1) {
                        if (key1 == 'timestamp') {
                            value.timestamp = $filter('date')(value1, 'd MMM');
                        }
                    });
                });
                $scope.activityfeed = response.data.feed;
            }
        }, function errorCallback(response) {
            console.log('failed to load activityfeed');
        });

        //load problems data
        $http({
            method: 'GET',
            url: url + 'assignedproblems'
        }).then(function successCallback(response) {
            $scope.assignedproblems = response.data;
        }, function errorCallback(response) {
            console.log('failed to load assignedproblems');
        });

        //load kudos data
        $http({
            method: 'GET',
            url: url + 'kudos'
        }).then(function successCallback(response) {
            $scope.kudos = response.data;
        }, function errorCallback(response) {
            console.log('failed to load kudos');
        });

        //load skills data
        $http({
            method: 'GET',
            url: url + 'skills'
        }).then(function successCallback(response) {
            $scope.skills = response.data;
        }, function errorCallback(response) {
            console.log('failed to load skills');
        });

        //init E-box parameter to not be shown
        $scope.Ebox = false;

        //show e-box
        $scope.showEbox = function () {
            $scope.Ebox = true;
        };

        //store skills img names
        $scope.skillsIcons = ['PhoneIcon', 'BriefcaseIcon', 'BookIcon', 'StopWatchIcon'];
    }]);

