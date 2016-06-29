module.exports = (function() {
    /// Require Moment.js 
    var moment = require('moment'); 
    var filters = angular.module('NewsAppFilters', []).filter('fromNow', function(){
        
        /// Return a function to Change Article Published Time Stamp to Time Amount From Now.
        return function (input) {
            return moment(input).fromNow();
        };
    });
/// Close IFFE Statement for Module - Immediately available when required in app.js 
})();
