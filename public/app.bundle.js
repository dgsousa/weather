webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});


var AppConfig = function AppConfig($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider.when('/', {
		templateUrl: 'views/main.html'
	}).when('/daily', {
		templateUrl: 'views/daily.html'
	}).when('/hourly', {
		templateUrl: 'views/hourly.html'
	}).otherwise({
		redirectTo: '/'
	});
};

exports.default = AppConfig;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});


var MainController = function MainController($scope, weatherService) {

	var zipCode = function zipCode(search) {
		return typeof parseInt(search) === 'number' && search.length === 5;
	};

	var displayWeather = function displayWeather(response) {
		if (response.status === 200) {
			$scope.city = response.data.city;
			$scope.state = response.data.region;
			$scope.current = response.data.currently;
			$scope.daily = response.data.daily.data;
			$scope.hourly = response.data.hourly.data;
		} else {
			console.log("There was an error getting the weather Data for this location");
		}
	};

	$scope.enter = function (e) {
		if (e.which === 13) {
			var search = $scope.search.split(' ').join('');
			var location = zipCode(search) ? 'components=postal_code:' + search : 'address=' + search + '&components=country:US';
			weatherService.getWeatherFromSearch(location, displayWeather);
		}
	};

	weatherService.getWeatherFromIP(displayWeather);
};

exports.default = MainController;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var degreeFilter = function degreeFilter() {
	return function (number) {
		return Math.floor(5 / 9 * (number - 32));
	};
};

exports.default = degreeFilter;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});


var search = function search() {
	return {
		scope: {
			handler: '&onKeypress'
		},
		link: function link(scope, element) {
			element.bind('keypress', function (e) {
				scope.handler({ $event: e });
			});
		}
	};
};

exports.default = search;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});


function weatherService($http) {

	this.getWeatherFromIP = function (callback) {
		$http.get("/api/ip").then(callback);
	};

	this.getWeatherFromSearch = function (location, callback) {
		$http.post("/api/search", { location: location }).then(callback);
	};
}

exports.default = weatherService;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(2);

var _angular2 = _interopRequireDefault(_angular);

var _angularRoute = __webpack_require__(0);

var _angularRoute2 = _interopRequireDefault(_angularRoute);

var _angularSanitize = __webpack_require__(1);

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

var _AppConfig = __webpack_require__(4);

var _AppConfig2 = _interopRequireDefault(_AppConfig);

var _MainController = __webpack_require__(5);

var _MainController2 = _interopRequireDefault(_MainController);

var _weatherService = __webpack_require__(8);

var _weatherService2 = _interopRequireDefault(_weatherService);

var _degreeFilter = __webpack_require__(6);

var _degreeFilter2 = _interopRequireDefault(_degreeFilter);

var _search = __webpack_require__(7);

var _search2 = _interopRequireDefault(_search);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _angular2.default.module('weatherApp', [_angularRoute2.default, _angularSanitize2.default, "angular-skycons"]).config(["$locationProvider", "$routeProvider", _AppConfig2.default]).service("weatherService", ["$http", _weatherService2.default]).filter("degreeFilter", _degreeFilter2.default).directive("search", _search2.default).controller("MainController", ["$scope", "weatherService", _MainController2.default]);

/***/ })
],[9]);