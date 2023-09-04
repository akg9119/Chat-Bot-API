'use strict';

var app = angular.module('myApp.chatBot', [])
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    templateUrl: 'chatBot/chatBot.html',
    controller: 'ChatController'
  });
}])

app.service("chatGetService", function ($http, $q) {
  this.httpGet = function (url) {
    var d = $q.defer();
    // var token = localStorage.getItem("token");
    $http({
      method: "GET",
      url: url,
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   'Authorization': token
      // }
    }).then(function (response) {
      d.resolve(response.data);

    }).catch(function (error) {
      d.resolve(error.data);
    });
    return d.promise;
  }
});

app.service('loginService', function ($http, $q) {
  this.httpPost = function (data, url) {
    var d = $q.defer();
    $http({
      method: 'POST',
      url: url,
      data: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        d.resolve(response.data);
      })
      .catch(function (error) {
        d.resolve(error.data);
      });
    return d.promise;
  }
})
app.controller('ChatController', ['$scope', 'chatGetService', function ($scope, chatGetService) {
  $scope.chatMessages = [];
  $scope.userReply = [];
  $scope.showChatbox = false;

  $scope.toggleChatbox = function () {
    $scope.showChatbox = !$scope.showChatbox;
  };
  $scope.firstName = function () {
    $scope.welcomeMessage = "Hello! Welcome to GreenTin";
  }

  // Function to scroll to the data section corresponding to the clicked question

  // $scope.handleQuestionClick = function (allCategory) {
    
  //   console.log(allCategory);
  //   $scope.targetDataId = '#' + allCategory.CategoryName;
    // const targetDataSection = angular.element(document.querySelector(targetDataId));

    // $anchorScroll(targetDataId);
    // if (targetDataSection.length > 0) {
      
    //   console.log(targetDataId);
    // }
  //  $scope.outputList(allCategory);
    
  // };


  //----------------- main question function
  $scope.categoryList =[];

  console.log($scope.categoryList); 
  $scope.category = function () {
    // chatGetService.httpGet('/localhost:8081/chatBot/getEachCategoriesQuestions/').then(function(response){
    // if (response) {
    //   $scope.questionList = response.outputList;
    // }
    // })
    chatGetService.httpGet("/angular-seed-master/assets/jsonData/category.json").then(function (response) {
      if (response) {
        $scope.questionList = response.outputList;
        console.log($scope.questionList);
        $scope.categoryList.push($scope.questionList);
      }
    });
  };
  $scope.category();
  console.log( $scope.categoryList);


  // categoryList.forEach((categoryObj) => {
  //   if (allCategory.CategoryId === categoryObj.CategoryId) {
  //     console.log(`Match found for ${allCategory.CategoryId} in ${categoryObj.CategoryName}`);
  //   }
  

  // ---------------Greentin Products
  $scope.productList = [];
  $scope.productInfoGreentinProduct = [];
  // ---------------Product Services
  // $scope.serviceList = [];
  $scope.serviceInfoData = [];
  // ---------------Prominent Clients
  // $scope.prominentClients = [];
  $scope.ClientsDetails = []
  // ---------------Know our Staff
  // $scope.StaffList = [];
  $scope.staffInfo = [];

  $scope.outputList = function (allCategory) {
    // for(var i=0;i<$scope.categoryList[0].length;i++){
    //   var categoryDataId = $scope.categoryList[0].CategoryId;
    // console.log(categoryDataId);
    // }
    if (allCategory.CategoryId == 1) {
      // var CategoryId = allCategory.CategoryId;
      // chatGetService.httpGet('/localhost:8081/chatBot/getEachCategoriesQuestions/'+CategoryId).then(function(response){
      // if (response) {
      //   for (var i = 0; i < response.outputList.length; i++) {
      //     var info = {
      //       Question: response.outputList[i].Question,
      //     };
      //     $scope.productList.push(info);
      //   }
      // }
      // }
      // })
      chatGetService.httpGet('/angular-seed-master/assets/jsonData/GTCategoryQuestionsList.json').then(function (response) {
        if (response) {
          for (var i = 0; i < response.outputList.length; i++) {
            var info = {
              Question: response.outputList[i].Question,
            };
            $scope.productList.push(info);
          }
        }
      })
      $scope.productInfo = function (info) {
        // var ProductId = info.ProductId;
        // chatGetService.httpGet('/localhost:8081/chatBot/getEachCategoriesQuestions/'+ProductId).then(function(response){
        // if (response) {
        // for (var i = 0; i < response.outputList.length; i++) {
        //   var info = {
        //     ProductName: response.outputList[i].ProductName,
        //     ProductAnnualSubscriptionCost: response.outputList[i].ProductAnnualSubscriptionCost,
        //     ProductInfo: response.outputList[i].ProductInfo,
        //   };
        //   $scope.productInfoGreentinProduct.push(info);
        // }
        // }
        // }) 
        chatGetService.httpGet('/angular-seed-master/assets/jsonData/productInfo.json').then(function (response) {
          $scope.showProductInfo = true;
          if (response) {
            for (var i = 0; i < response.outputList.length; i++) {
              var info = {
                ProductName: response.outputList[i].ProductName,
                ProductAnnualSubscriptionCost: response.outputList[i].ProductAnnualSubscriptionCost,
                ProductInfo: response.outputList[i].ProductInfo,
              };
              $scope.productInfoGreentinProduct.push(info);
            }
          }
        })
      }
    }
    else if (allCategory.CategoryId === 2) {
      // var CategoryId = allCategory.CategoryId;
      // chatGetService.httpGet('http://localhost:8081/chatBot/getEachCategoriesQuestions/'+CategoryId).then(function(response){
      // if (response) {
      //   $scope.serviceList = response.outputList;
      // }
      // })
      chatGetService.httpGet('/angular-seed-master/assets/jsonData/ProductServices.json').then(function (response) {
        if (response) {
          $scope.serviceList = response.outputList;
        }
      })
      $scope.serviceInfo = function (info) {
        $scope.showInfo = true;
        // var serviceId =info.serviceId;
        // chatGetService.httpGet('http://localhost:8081/chatBot/getEachProductsServiceDetails/'+serviceId).then(function (response) {
        //   if (response) {
        // for (var i = 0; i < response.outputList.length; i++) {
        //   var info = {
        //     serviceName: response.outputList[i].serviceName,
        //     serviceInfo: response.outputList[i].serviceInfo
        //   };
        //   $scope.serviceInfoData.push(info);
        // }
        //   }
        // })
        chatGetService.httpGet('/angular-seed-master/assets/jsonData/myeNovationServicesInfo.json').then(function (response) {
          if (response) {

            for (var i = 0; i < response.outputList.length; i++) {
              var info = {
                serviceName: response.outputList[i].serviceName,
                serviceInfo: response.outputList[i].serviceInfo
              };
              $scope.serviceInfoData.push(info);
            }
          }
        })
      }
    }
    else if (allCategory.CategoryId === 3) {
      // var CategoryId = allCategory.CategoryId;
      // chatGetService.httpGet('/angular-seed-master/assets/jsonData/ProminenetClients.json/'+CategoryId).then(function(response){
      // if (response) {
      // $scope.clientsList = response.outputList;
      // }
      // })
      chatGetService.httpGet('/angular-seed-master/assets/jsonData/ProminenetClients.json').then(function (response) {
        if (response) {
          $scope.clientsList = response.outputList;
        }
      })
      $scope.clientsInfo = function (info) {
        $scope.showClients = true;
        var clientId = info.clientId;
        // chatGetService.httpGet('/http://localhost:8081/chatBot/getEachProductsClientsDetails/'+clientId).then(function(response){
        // if (response) {
        // for (var i = 0; i < response.outputList.length; i++) {
        //   var info = {
        //     clientName: response.outputList[i].clientName,
        //     clientUrl: response.outputList[i].clientUrl
        //   };
        //   $scope.ClientsDetails.push(info);
        // }
        // }
        // })
        chatGetService.httpGet('/angular-seed-master/assets/jsonData/ProductsClientsDetails.json').then(function (response) {
          for (var i = 0; i < response.outputList.length; i++) {
            var info = {
              clientName: response.outputList[i].clientName,
              clientUrl: response.outputList[i].clientUrl
            };
            $scope.ClientsDetails.push(info);
          }
        })
      }
    }
    else if (allCategory.CategoryId === 4) {
      // var CategoryId = allCategory.CategoryId;
      // chatGetService.httpGet('/localhost:8081/chatBot/getEachCategoriesQuestions/'+CategoryId).then(function(response){
      // if (response) {
      // $scope.StaffList = response.outputList;
      // }
      // })
      chatGetService.httpGet('/angular-seed-master/assets/jsonData/KnowOurStaff.json').then(function (response) {
        if (response) {
          $scope.StaffList = response.outputList;
        }
      })

      $scope.employeeInfo = function (info) {
        console.log(info);
        $scope.EmpDetails = true;
        // $scope.questionId=info.questionId;  
        // chatGetService.httpGet('/http://localhost:8081/chatBot/getEachCategoryQuestions/'+questionId).then(function(response){
        // if (response) {
        // for (var i = 0; i < response.outputList.length; i++) {
        //   var info = {
        //     employeeName: response.outputList[i].employeeName,
        //     employeeMailId: response.outputList[i].employeeMailId,
        //     employeeDesignation: response.outputList[i].employeeDesignation,
        //     employeeContact: response.outputList[i].employeeContact
        //   };
        //   $scope.staffInfo.push(info);
        // }
        // }
        // })
        chatGetService.httpGet('/angular-seed-master/assets/jsonData/EmployeeDetails.json').then(function (response) {
          for (var i = 0; i < response.outputList.length; i++) {
            var info = {
              employeeName: response.outputList[i].employeeName,
              employeeMailId: response.outputList[i].employeeMailId,
              employeeDesignation: response.outputList[i].employeeDesignation,
              employeeContact: response.outputList[i].employeeContact
            };
            $scope.staffInfo.push(info);
          }
        })
      }

    }
  }
}]);














