angular.module( 'PlayTask', [
  'templates-app',
  'templates-common',
  'ui.router',
  'angular.filter'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope ,$http,$filter) {

  $http({
    method: 'GET',
    url: 'https://pure-falls-1534.herokuapp.com/profile'
  }).then(function successCallback(response) {
    $scope.profile = response.data;
  }, function errorCallback(response) {

  });
  $http({
    method: 'GET',
    url: 'https://pure-falls-1534.herokuapp.com/activityfeed'
  }).then(function successCallback(response) {
    if(response.data && response.data.feed) {
        angular.forEach(response.data.feed, function(value, key) {
          angular.forEach(value, function(value1, key1) {
            if (key1 =='timestamp'){
                value.timestamp = $filter('date')(value1, 'd MMM');
            }
          });
      });
      $scope.activityfeed = response.data.feed;
    }
  }, function errorCallback(response) {

  });
  $http({
    method: 'GET',
    url: 'https://pure-falls-1534.herokuapp.com/assignedproblems'
  }).then(function successCallback(response) {
    $scope.assignedproblems = response.data;
  }, function errorCallback(response) {

  });
  $http({
    method: 'GET',
    url: 'https://pure-falls-1534.herokuapp.com/kudos'
  }).then(function successCallback(response) {
    $scope.kudos = response.data;
  }, function errorCallback(response) {

  });
  $http({
    method: 'GET',
    url: 'https://pure-falls-1534.herokuapp.com/skills'
  }).then(function successCallback(response) {
    $scope.skills = response.data;
  }, function errorCallback(response) {

  });
    $scope.Ebox = false;

    $scope.showEbox = function () {
        $scope.Ebox = true;
    };

  $scope.skillsIcons=['PhoneIcon','BriefcaseIcon','BookIcon','StopWatchIcon'];
});

