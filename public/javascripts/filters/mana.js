'use strict';

angular.module('magecomFilters')
    .filter('mana', function (cdnLocation) {
        return function(str, size) {
            if(str) {
                var pattern = /\[(.)\]/gi;
                return str.replace(pattern, '<img src="' + cdnLocation + 'symbol/' + size + '/$1.jpg" />');
            }// else {

            //}
        };
    });