/* es next = true */
'use strict';
/// MUST RUN PYTHON FROM PUBLIC DIRECTORY w/ TERMINAL
/// Run : python -m SimpleHTTPServer
/// In Browser set address to: localhost:8000

require('./controllers');
require('./factory');
require('./filters');

var app = angular.module('AnchormanApp', [
    'ngRoute', 
    'NewsAppControllers',
    'NewsAppFactory',
    'NewsAppFilters',
    ]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/userId/news', {
            controller: 'LiveStreamController',
            templateUrl: 'templates/LiveStreamView.html',
        }).
        when('/userId/interests', {
            controller: 'InterestSettingController',
            templateUrl: 'templates/IntrestSettingView.html',
        }).
        when('/userId/bookmarks', {
            controller: 'BookmarkController',
            templateUrl: 'templates/BookmarkView.html'
        }).
        otherwise({
            redirectTo: '/userId/news'
        });
    //console.log('Router Hot');
}]);

////// ALL CONTROLLERS IN CONTROLLERS.JS //////
////// See Require.js Requirements ABOVE //////


//////      FACTORY IS IN FACTORY.JS     //////
////// See Require.js Requirements ABOVE //////



