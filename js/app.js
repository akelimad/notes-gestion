// api url
var baseApiUrl = "http://localhost/zeyncore/api";
var monapp = angular.module("monapp", ['ngRoute']);
var app = angular.module("AngularApp", ['ngRoute'], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/home', {
    templateUrl:'partial/home.html',
    controller:'homeController',
  }).
  when('/create_user', {
    templateUrl:'partial/create_user.html',
    controller:'createUserController',
  }).
  when('/notes', {
    templateUrl:'partial/notes.html',
    controller:'postsController',
  }).
  when('/create_note', {
    templateUrl:'partial/create_note.html',
    controller:'createNoteController',
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);

app.controller("homeController", function($scope, $http){
  $http({
    "method" : "POST",
    "url" : baseApiUrl + "/main.php?action=users_list",
  }).then(function(data){
    $scope.users = data.data.users;
  });

});

app.controller("createUserController", function($scope, $http, $location){
  $scope.createUser = function(){
    $http.post("api/createUser.php",{
      'username':$scope.username,
      'email':$scope.email,
      'password':$scope.password
    }).success(function(data, status, headers, config){
      alert("user created");
    });
  };
});

app.controller("createNoteController", function($scope, $http, $location){
  $scope.createUser = function(){

    $http({
      method: 'POST',
      url: baseApiUrl + "/main.php?action=create_user",
      data: $scope.formData,
    }).then(function(data){
      if (data.error)
      {
        alert(data.data.msgContent);
      }
      else {
        alert(data.data.msgContent);
        $location.path('/home.html');
      }
    });
  };
});

monapp.config(function ($routeProvider){
    $routeProvider
    .when('/', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
    .otherwise({redirectTo : '/'});
});
