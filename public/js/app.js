var app = angular.module('weatherApp', ['ngSanitize', 'angular-skycons', 'ngRoute']);
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'MainController',
			templateUrl: 'views/main.html' 
		})
		.when('/daily', {
			controller: 'MainController',
			templateUrl: 'views/daily.html'
		})
		.when('/hourly', {
			controller: 'MainController',
			templateUrl: 'views/hourly.html'
		})
		.otherwise({
			redirectTo: '/'
		});
})