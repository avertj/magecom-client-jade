'use strict';

angular.module('magecomServices')
    .factory('Card', ['$resource', function($resource) {
        return $resource('http://localhost:8080/magecom-ejb/api/card/:cardId', {cardId: '@id'}, {
            query: {method:'GET', isArray:true}
        });
    }]).factory('CardRelated', ['$resource', function($resource) {
        return $resource('http://localhost:8080/magecom-ejb/api/card/:cardId/related', {cardId: '@id'}, {
            query: {method:'GET', isArray:true}
        });
    }]);