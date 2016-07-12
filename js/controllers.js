module.exports = (function() {
    var controllers = angular.module('AppControllers', []);
    
    ////// Controller for FEED / STREAM //////
    controllers.controller('LiveStreamController', ['$scope', 'AppService', function ($scope, AppService) {
        /* Service Test
        console.log('Live Stream View Working'); //Router
        console.log(NewsService.silento()); //Factory
        */
        
        // Get Initial Feed Articles
        $scope.news = AppService.getArticles();
        
        
        // Bookmark an Article
        $scope.clickSendID = function(ID) {AppService.setBookmark(ID);};
        
        // Get Weather Forecasts
        $scope.weather = AppService.getWeather();
        console.log(AppService.getWeather());
        
        
        // Manage Show-Hide Content  Tabs
        $scope.dataGroups = ["forecast", "news", "bookmarks", "todo"];
        
        $scope.classAttach = function(input) {
            console.log(input);
            var element = document.getElementById(input);
            element.classList.add("show");};
        
        $scope.classRemove = function(input) {
            var element = document.getElementById(input);
            element.classList.remove("show");};
    }]);

    ////// Controller for INTERESTS //////
    controllers.controller('InterestSettingController', ['$scope', 'AppService', function ($scope, AppService) {
        /* Service Test
        console.log('Live Stream View Working'); //Router
        console.log(NewsService.silento()); //Factory
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
        console.log('Live Stream View Working'); //Router
        console.log(NewsService.silento()); //Factory
        */
        
        // Get Bookmarked Articles
        $scope.news = AppService.getBookmarks();
        
        // Un-Bookmark an Articles
        $scope.clickSendID = function(ID) {AppService.removeBookmark(ID);};
    }]);
    
/// Close IFFE Statement for Module - Immediately available when required in app.js    
}());