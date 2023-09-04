'use strict';

var app = angular.module('myApp', ['ngRoute',
 'myApp.chatBot'
]);
// app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//   $locationProvider.hashPrefix('!');
//   $routeProvider.otherwise({
//     templateUrl: 'app/chatBot/chatBot.html'
//   })

//   $routeProvider.otherwise('/chatBot', {
//     templateUrl: 'chatBot/chatBot.html',
//     controller: 'ChatController'
//   });
//   }]);

