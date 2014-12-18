'use strict';

angular.module('magecomFilters')
    .filter('mana', function() {
        return function(str, size) {
            if(str) {
                var pattern = /\[(.)\]/gi;
                return str.replace(pattern, "<img ng-src='{{cdnLocation + \"/cards/symbol/" + size + "/$1.jpg\"}}'>");
            }// else {

            //}
        };
    });