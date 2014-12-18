'use strict';

angular.module('magecomServices')
    .factory('Deck', ['$resource', 'apiLocation', function($resource, apiLocation) {
        return  {
                detail: $resource(apiLocation + 'magecom-ejb/api/deck/:deckId', {deckId: '@id'}, {query: {method:'GET', isArray:true}, put: {method:'PUT'}, post: {method:'POST'}, del: {method:'DELETE'}}),
                search: $resource(apiLocation + 'magecom-ejb/api/deck/search', {}, {query: {method:'GET', isArray:true}})
                }
    }]);