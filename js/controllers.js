module.exports = (function() {
    var controllers = angular.module('NewsAppControllers', []);
    
    ////// Controller for FEED / STREAM //////
    controllers.controller('LiveStreamController', ['$scope', 'NewsService', function ($scope, NewsService) {
        /* Service Test
        console.log('Live Stream View Working'); //Router
        console.log(NewsService.silento()); //Factory
        */
        
        // Get Initial Feed Articles
        $scope.news = NewsService.getArticles();
        
        
        // Bookmark an Article
        $scope.clickSendID = function(ID) {NewsService.setBookmark(ID);};
        
        $scope.weather = NewsService.getWeather();
        console.log(NewsService.getWeather());
    }]);

    ////// Controller for INTERESTS //////
    controllers.controller('InterestSettingController', ['$scope', 'NewsService', function ($scope, NewsService) {
        /* Service Test
        console.log('Live Stream View Working'); //Router
        console.log(NewsService.silento()); //Factory
        */
        
        // Add an Interest & Clear Input Field / Value
        $scope.clickSendInput = function(input) {
            //console.log(input);
            NewsService.addInterest(input);
            let a = document.getElementById('interestInput');
            a.value = '';
            $scope.newInterest = null;
        };
        
        // Get User Interests
        $scope.interests = NewsService.getInterests();
        
        // Remove an Interest
        $scope.clickSendID = function(input) {NewsService.removeInterests(input);};
        
    }]);
    
    ////// Controller for BOOKMARKS //////
    controllers.controller('BookmarkController', ['$scope', 'NewsService', function ($scope, NewsService) {
        /* Service Test
        console.log('Live Stream View Working'); //Router
        console.log(NewsService.silento()); //Factory
        */
        
        // Get Bookmarked Articles
        $scope.news = NewsService.getBookmarks();
        
        // Un-Bookmark an Articles
        $scope.clickSendID = function(ID) {NewsService.removeBookmark(ID);};
    }]);
    
/// Close IFFE Statement for Module - Immediately available when required in app.js    
}());