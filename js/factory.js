//// Set Module in IFFE so it immediately "unpacks" once required in app.js
module.exports = (function() {
    var appFactory = angular.module('AppFactory', []);
    
    appFactory.factory('AppService', function ($http, $q) {
        
        // DAILY QUOTE WEBSERVICE
        var quotes = [];      // daily quote
        
        $http({
            method: 'GET',
            url: 'http://quotes.rest/qod.json'
        }).then(function (response) {
            angular.copy(response.data.contents.quotes, quotes);
        });
        
        
        // TO-DO: Wire Up Location services and Find() within cities.json for adjustable xURL -OR- User Settings / Location Setting
        
        // WEATHER FORECAST WEBSERVICE
        var weather = [];
        var xURL = '4460243'; // Id for Charlotte, NC
        var KEY = 'e25e68ed83e545588247aaced65f888d'; // THIS Project Key
        
        $http({
            method: 'GET', 
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + xURL + '&units=imperial&appid=' + KEY
        }).then(function (response) {
            angular.copy(response.data.list, weather);
            //console.log(weather);
        });

        
        /// THE KAMEHAMEHA PROMISE FOR API AJAX
        /// CALLS FEED AND PUBLISHER; BLEND TO ONE RESOURCE ARRAY 
        var news = [];       // all articles
        var current = {};    // current article
        var publishers = []; // all publishers
        
        var feed = $http({
            url: 'http://chat.queencityiron.com/api/news/latest',
            method: 'get'
        });
        
        var pubs = $http({
            url: 'http://chat.queencityiron.com/api/publishers',
            method: 'get'
        });
        
        $q.all([feed, pubs])
        .then(function(results) {
            for (let i = 0; i < results[0].data.stories.length; i++) {
                results[0].data.stories[i].provider = '';
                results[0].data.stories[i].logo = '';
                for (let j = 0; j < results[1].data.providers.length; j++) {
                    if (results[0].data.stories[i].providerId ===           results[1].data.providers[j].id) {
                        results[0].data.stories[i].provider = results[1].data.providers[j].name;
                        results[0].data.stories[i].logo = results[1].data.providers[j].logo;
                    }
                }
                news.push(results[0].data.stories[i]);
            }
        });
                
        /// WEBSOCKET TO GET UPDATES
        var ws = new WebSocket('ws://chat.queencityiron.com/api/feed');
        
        ws.onopen = function(event) {
            //console.log('Websocket Open');
            //console.log(event);
        };
        
        /// UPDATES ARE COMPARED TO NEWS ARRAY
        /// IF UPDATE HAS NEW ID; UPDATE IS FUSED WITH PUBLISHERS
        /// UPDATE IS ALSO ADDED TO NEWS & OLDEST ARTICLE IS REMOVED
        ws.onmessage = function(event) {
            var response = event.data;
            console.log(event.data);
            // if response is a news article
            if (response.hasOwnProperty('id')) {
                response.provider = '';
                response.logo = '';
                for (let i = 0; i < publishers.length; i++) {
                    if (response.providerId === publishers[i].id) {
                        response.provider = publishers[i].name;
                        response.logo = publishers[i].logo;
                    }
                }
                news.sort(function (a, b) {
                    return a.published + b.published;
                });
                
                for (let i = 0; i < news.length; i++) {
                    if (response.id !== news[i].id) {
                        news.pop();
                        news.push(response);
                    }
                }
            }
        };
 
        // OTHER LOCAL VARS
        var bookmarks = [];  // bookmarked articles
        var interests = [];  // all interests
        var count = 7;       // forecast setting
        
    
        /// FACTORY RETURN OBJECT 
        return {
            
            /// Function to Deliver Daily Quote Array to Home Controller
            getQuote: function () {
                return quotes;
            },
            
            /// Function to Deliver News Article Array to News Controller
            /// Function Analyzes Article Titles and User Interest
            /// Interest Matches Are Added to a new Article Object Property
            getArticles: function () {
                for (let i = 0; i < news.length; i++) {
                    news[i].interests = [];
                    for (let j = 0; j < interests.length; j++) {
                        var titleArr = news[i].title.toLowerCase().split(' ');
                        //console.log(titleArr);
                        for (let k = 0; k < titleArr.length; k++) {
                            if (titleArr[k] === interests[j]) {
                                news[i].interests.push(interests[j]);
                                //console.log(news[i].interests);
                            }
                        }          
                    }
                    
                }
                console.log(news);
                return news;
            },
            
            /// Function to Deliver Bookmarks Array to Bookmarks Controller
            getBookmarks: function () {
                console.log(bookmarks);
                return bookmarks;
            },
            
            /// Function to Add Selected Article to Bookmarks Array
            setBookmark: function(input) {
                for (let i = 0; i < news.length; i++) {
                    if (news[i].id === input) {
                        bookmarks.push(news[i]);
                    }
                }
                console.log('Add Bookmark Clicked');
                console.log(bookmarks);
                return bookmarks;
            },
            
            /// Function to Remove Selected Article From Bookmarks Array
            removeBookmark: function(input) {
                for (let i = 0; i < bookmarks.length; i++) {
                    if (bookmarks[i].id === input) {
                        bookmarks.splice(i, 1);
                    }
                }
                console.log('Remove Bookmark Clicked');
                console.log(bookmarks);
                return bookmarks;
            },
            
            /// Function to Deliver Interests Array to Interests Controller
            getInterests: function () {
                console.log(interests);
                return interests;
            },
            
            /// Function to Add New Interest to Interests Array
            addInterest: function(input) {
                let holder = input.toLowerCase();
                interests.push(holder);
                //console.log('Add To Interests Clicked')
                console.log(interests);
                return interests;
            },
            
            /// Function to Remove Interest from Interests 
            removeInterests: function(input) {
                for (let i = 0; i < interests.length; i++) {
                    if (interests[i] === input) {
                        interests.splice(i, 1);
                    }
                }
                //console.log('Removed From Interests clicked');
                console.log(interests);
                return interests;
            },
            
            /// Function to Deliver Weather Array to Weather Controller
            getWeather: function () {
                //console.log(weather);
                return weather;
            },
            
            /// Function for Forecast to Change Count
            setCounter: function(param) {
                count = count + param;
                console.log("count changed by " + param);
            },
            
            getCounter: function() {
                return count;
            },
            
            /// Function to Set Weather City
            setLocation: function(input) {
                xURL = input;
            },
            
            /// Function for Calling in Controller to verify Link-up
            silento: function () {
                return 'Watch me WHIP! now watch me NAE NAE!';
            },
        };   
    });
/// Close IFFE Statement for Module - Immediately available when required in app.js
}());















