module.exports = (function() {
    /// Require Moment.js 
    var moment = require('moment'); 
    var filters = angular.module('AppFilters', []).filter('fromNow', function(){
        
        /// Filter Function To Return Time Elapsed from UTC Time Stamp - NEWS ARTICLES
        return function (input) {
            return moment(input).fromNow();
        };
        
    }).filter('today', function(){
        return function (input) {
            return moment(input).format("M.D.YYYY");
        };
        
    }).filter('unixEp', function(){
        
        /// FILTER Function to Convert UNIX Epoch Count and Return Specific Weekday - WEATHER FORECAST 
        return function(input) {
            let day = "";
            let intD  = moment.unix(input).day();
            
            switch (intD) {
                case 0:
                    day = "Sunday";
                    break;
                case 1:
                    day = "Monday";
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                case 3:
                    day = "Wednesday";
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday";
                    break;
                case 6:
                    day = "Saturday";
            }
            return day;
        };
        
    }).filter('farenheit', function(){
        
        return function(input) {
            return Math.round(input) + "\xB0 F";
        };

    });
    
    
/// Close IFFE Statement for Module - Immediately available when required in app.js 
})();