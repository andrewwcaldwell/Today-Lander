module.exports = (function() {
    var controllers = angular.module('AppControllers', []);
    
    
    ////// Controller for HOME //////
    controllers.controller('HomeController', ['$scope', 'AppService', function ($scope, AppService) {
        /* Service Test
        console.log('Home View Working'); //Router
        console.log(AppService.silento()); //Factory
        */
        
        // Get Today's Date for Display
        $scope.date = Date.now();
        
        // Get Daily Quote
        $scope.quote = AppService.getQuote();
        
        // FIND QUOTE GEN API AND INCLUDE
    }]);
    
    ////// Controller for WEATHER //////
    controllers.controller('WeatherController', ['$scope', 'AppService', function ($scope, AppService) {
        /* Service Test
        console.log('Weather View Working'); //Router
        console.log(AppService.silento()); //Factory
        */
        
        // Get Weather Forecasts
        $scope.weather = AppService.getWeather();
        console.log(AppService.getWeather());
        
    }]);
    
    ////// Controller for NEWS //////
    controllers.controller('NewsController', ['$scope', 'AppService', function ($scope, AppService) {
        /* Service Test
        console.log('News View Working'); //Router
        console.log(AppService.silento()); //Factory
        */
        
        // Get Initial Feed Articles
        $scope.news = AppService.getArticles();
        
        
        // Bookmark an Article
        $scope.clickSendID = function(ID) {AppService.setBookmark(ID);};
        
    }]);

    ////// Controller for INTERESTS //////
    controllers.controller('InterestSettingController', ['$scope', 'AppService', function ($scope, AppService) {
        /* Service Test
        console.log('Interest View Working'); //Router
        console.log(AppService.silento()); //Factory
        */
        
        // Add an Interest & Clear Input Field / Value
        $scope.clickSendInput = function(input) {
            //console.log(input);
            AppService.addInterest(input);
            let a = document.getElementById('interestInput');
            a.value = '';
            $scope.newInterest = null;
        };
        
        // Get User Interests
        $scope.interests = AppService.getInterests();
        
        // Remove an Interest
        $scope.clickSendID = function(input) {AppService.removeInterests(input);};
        
    }]);
    
    ////// Controller for BOOKMARKS //////
    controllers.controller('BookmarkController', ['$scope', 'AppService', function ($scope, AppService) {
        /* Service Test
        console.log('Bookmark View Working'); //Router
        console.log(AppService.silento()); //Factory
        */
        
        // Get Bookmarked Articles
        $scope.news = AppService.getBookmarks();
        
        // Un-Bookmark an Articles
        $scope.clickSendID = function(ID) {AppService.removeBookmark(ID);};
    }]);
    
/// Close IFFE Statement for Module - Immediately available when required in app.js    
}());