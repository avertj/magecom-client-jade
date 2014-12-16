'use strict';

angular.module('magecomServices')
    .factory('Deck', ['$resource', function($resource) {
        return  {
                detail: $resource('http://localhost:8080/magecom-ejb/api/deck/:deckId', {deckId: '@id'}, {query: {method:'GET', isArray:true}, put: {method:'PUT'}}),
                search: $resource('http://localhost:8080/magecom-ejb/api/deck/search', {}, {query: {method:'GET', isArray:true}})
                }
    }]);