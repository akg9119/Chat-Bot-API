'use strict';

var app = angular.module('myApp.view1', ['ngRoute', 'ui.select'])

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'deptListCtrl'
  });
}]);

app.service("deptListService", function ($http, $q) {
  this.httpGet = function (url) {
    var d = $q.defer();
    var token = localStorage.getItem("token");
    $http({
      method: "GET",
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(function (response) {
      d.resolve(response.data);

    }).catch(function (error) {
      d.resolve(error.data);
    });
    return d.promise;
  }
});
app.controller("deptListCtrl", ['$scope', 'deptListService', '$rootScope', function ($scope, deptListService, ) { 
  $scope.add = false;
  $scope.cancelAdd = function () {
  $scope.add = false;
  };
  $scope.clearSelectedLines = function () {
    $scope.selectedLine = [];
  };
  $scope.departmentList = function () {
    var loggedInBranchId = localStorage.getItem("loggedInBranchId");
    deptListService.httpGet("https://api.myenovation.com/enovation-trial/getdepartmentlistbybranchid/" + loggedInBranchId).then(function (response) {
       if (response.result) {
        $scope.deptList = response.deptList;
      }
    });
  };
  $scope.departmentList();
  $scope.lineList = function () {
    var id = $scope.selectedDept;
    var deptId = id.deptId;
    deptListService.httpGet('https://api.myenovation.com/enovation-trial/getLineNameList/' + deptId).then(function (response) {
      $scope.linelist = response.lineList;
    });
  };

  $scope.onSelectedLineChange = function (selectedLine) {
    $scope.selectedLineList = [];
    for (var i = 0; i < selectedLine.length; i++) {
      $scope.selectedLineList.push(selectedLine[i])
    }
  }
  $scope.addLine = function () {
    $scope.add = true;
  };

  $scope.removeLine = function (line) {
    var index = $scope.selectedLines.indexOf(line);
    if (index !== -1) {
      $scope.selectedLines.splice(index, 1);
    }
  };

}]);
