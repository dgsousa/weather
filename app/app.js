import angular from "angular";
import ngRoute from "angular-route";
import ngSanitize from "angular-sanitize";
import AppConfig from "./scripts/config/AppConfig.js";
import MainController from "./scripts/controllers/MainController.js";
import weatherService from "./scripts/services/weatherService.js";
import degreeFilter from "./scripts/directives/degreeFilter.js";
import search from "./scripts/directives/search.js";
import "./scss/application.scss";


const app = angular.module('weatherApp', [ngRoute, ngSanitize, "angular-skycons"])
	.config(["$locationProvider", "$routeProvider", AppConfig])
	.service("weatherService", ["$http", weatherService])
	.filter("degreeFilter", degreeFilter)
	.directive("search", search)
	.controller("MainController", ["$scope", "weatherService", MainController])
	



