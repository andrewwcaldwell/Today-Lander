module.exports = (function() {
    var controllers = angular.module('NewsAppControllers', []);
    
    ////// Controller for FEED / STREAM //////
    controllers.controller('LiveStreamController', ['$scope', 'NewsService', function ($scope, NewsService) {
        
        // Code to test View / Router
        //console.log('Live Stream View Working');
        
        // Code to Test Factory Link
        //console.log(NewsService.silento());

        // Code to Get Initial Feed Articles
        $scope.news = NewsService.getArticles();
        
        
        // Code to Bookmark an Article
        $scope.clickSendID = function(ID) {NewsService.setBookmark(ID);};     
    }]);

    ////// Controller for INTERESTS //////
    controllers.controller('InterestSettingController', ['$scope', 'NewsService', function ($scope, NewsService) {
        
        // Code to test View / Router
        //console.log('Interests Settings View Working');
        
        // Code to Test Factory Link
        //console.log(NewsService.silento());
        
        // Code to Add an Interest & Clear Input Field / Value
        $scope.clickSendInput = function(input) {
            //console.log(input);
            NewsService.addInterest(input);
            let a = document.getElementById('interestInput');
            a.value = '';
            $scope.newInterest = null;
        };
        
        // Code to Get User Interests
        $scope.interests = NewsService.getInterests();
        
        // Code to Remove an Interest
        $scope.clickSendID = function(input) {NewsService.removeInterests(input);};
        
    }]);
    
    ////// Controller for BOOKMARKS //////
    controllers.controller('BookmarkController', ['$scope', 'NewsService', function ($scope, NewsService) {
        
        // Code to test View / Router
        //console.log('Bookmarks View Working');
        
        // Code to Test Factory Link
        //console.log(NewsService.silento());
        
        // Code to Get Bookmarked Articles
        $scope.news = NewsService.getBookmarks();
        
        // Code to Un-Bookmark an Articles
        $scope.clickSendID = function(ID) {NewsService.removeBookmark(ID);};
    }]);
    
/// Close IFFE Statement for Module - Immediately available when required in app.js    
}());