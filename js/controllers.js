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
        
        // Get Weather Forecasts
        $scope.weather = NewsService.getWeather();
        console.log(NewsService.getWeather());
        
        
        // Manage Show-Hide Content  Tabs
        $scope.dataGroups = ["forecast", "news", "todo"];
        
        $scope.classAttach = function(input) {
            console.log(input);
            var element = document.getElementById(input);
            element.classList.add("show");};
        
        $scope.classRemove = function(input) {
            var element = document.getElementById(input);
            element.classList.remove("show");};
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