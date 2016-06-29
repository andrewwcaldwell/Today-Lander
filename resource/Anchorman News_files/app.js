(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function() {
    var controllers = angular.module('NewsAppControllers', []);
    
    ////// Controller for FEED / STREAM //////
    controllers.controller('LiveStreamController', ['$scope', 'NewsService', function ($scope, NewsService) {
        console.log('Live Stream View Working');
        console.log(NewsService.silento());
        $scope.articles = [];
        //$scope.pancake = '';
        $scope.news = NewsService.getArticles();
        $scope.clickSendID = function(ID) {NewsService.setBookmark(ID);};
    
//      function loadArticles(articles) {
//          $scope.news = articles;
//      }
//    
//      $scope.news = [];
//      NewsService.getArticles(loadArticles);
//      $scope.current = {
//          title: 'none yet'
//      };
    }]);

    ////// Controller for INTRESTS //////
    controllers.controller('IntrestSettingController', ['$scope', 'NewsService', function ($scope, NewsService) {
        console.log('Intrests Settings View Working');
        console.log(NewsService.silento());
    }]);
    
    ////// Controller for BOOKMARKS //////
    controllers.controller('BookmarkController', ['$scope', 'NewsService', function ($scope, NewsService) {
        console.log('Bookmarks View Working');
        console.log(NewsService.silento());
    }]);
    
    
}());
},{}],2:[function(require,module,exports){
module.exports = (function() {
    var newsFactory = angular.module('NewsAppFactory', []);
    
    newsFactory.factory('NewsService', function ($http) {
        var news = [];      // all articles
        var current = {};   // current article
        var bookmarks = [];  // bookmarked articles
    
        // not done
        $http({
            url: 'http://chat.queencityiron.com/api/news/latest',
            method: 'get'
        }).then(function (results) {
            for (let i = 0; i < results.data.stories.length; i++) {
                news.push(results.data.stories[i]);
            }
            //        news = results.data.stories
        });
        
        return {
            getArticles: function () {
                console.log(news);
                return news;
            },
            
            silento: function () {
                return 'Watch me WHIP! now watch me NAE NAE!';
            },
            
            setBookmark: function(input) {
                for (let i = 0; i < news.length; i++) {
                    if ( news[i].id === input) {
                        bookmarks.push(news[i]);
                    }
                }
                console.log('bookmark clicked');
                console.log(bookmarks);
                return bookmarks;
            },
            
            
            
        };   
    });

}());
},{}],3:[function(require,module,exports){
/* es next = true */
'use strict';
/// MUST RUN PYTHON FROM PUBLIC DIRECTORY w/ TERMINAL
/// Run : python -m SimpleHTTPServer
/// In Browser set address to: localhost:8000

require('./controllers');
require('./factory');

var app = angular.module('AnchormanApp', [
        'ngRoute', 
        'NewsAppControllers',
        'NewsAppFactory',
    ]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/userId/news', {
            controller: 'LiveStreamController',
            templateUrl: 'templates/LiveStreamView.html',
        }).
        when('/userId/interests', {
            controller: 'IntrestSettingController',
            templateUrl: 'templates/IntrestSettingView.html',
        }).
        when('/userId/bookmarks', {
            controller: 'BookmarkController',
            templateUrl: 'templates/BookmarkView.html'
        }).
        otherwise({
            redirectTo: '/userId/news'
        });
    console.log('Router Hot');
}]);

////// ALL CONTROLLERS IN CONTROLLERS.JS //////
////// See Require.js Requirements ABOVE //////


//////      FACTORY IS IN FACTORY.JS     //////
////// See Require.js Requirements ABOVE //////




},{"./controllers":1,"./factory":2}]},{},[3])