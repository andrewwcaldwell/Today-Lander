/* es next = true */
'use strict';
/// MUST RUN PYTHON FROM PUBLIC DIRECTORY w/ TERMINAL
/// Run : python -m SimpleHTTPServer
/// In Browser set address to: localhost:8000

require('./controllers');
require('./factory');
require('./filters');

var app = angular.module('TodayApp', [
    'ngRoute', 
    'AppControllers',
    'AppFactory',
    'AppFilters',
    ]);

/* 
 * TEMPLATES MUST BE CONVERTED 
 * FILE NAMES MUST BE CHANGED
 * ADJUSTMENTS BELOW
 */

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/userId/home', {
            controller: 'HomeController',
            templateUrl: 'templates/HomeView.html'
        }).
        when('/userId/weather', {
            controller: 'WeatherController',
            templateUrl: 'templates/WeatherView.html'
        }).
        when('/userId/news', {
            controller: 'NewsController',
            templateUrl: 'templates/NewsView.html',
        }).
        when('/userId/interests', {
            controller: 'InterestController',
            templateUrl: 'templates/IntrestSettingView.html',
        }).
        when('/userId/bookmarks', {
            controller: 'BookmarkController',
            templateUrl: 'templates/BookmarkView.html'
        }).
        when('/userId/todo', {
            controller: 'TodoController',
            templateUrl: 'templates/TodoView.html'
        }).
        otherwise({
            redirectTo: '/userId/home'
        });
    console.log('Router Hot');
}]);

////// ALL CONTROLLERS IN CONTROLLERS.JS //////
////// See Require.js Requirements ABOVE //////


//////      FACTORY IS IN FACTORY.JS     //////
////// See Require.js Requirements ABOVE //////



