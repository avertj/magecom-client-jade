'use strict';

angular.module('magecomServices')
    .factory('Card', ['$resource', 'apiLocation', function($resource, apiLocation) {
        return  {
                detail: $resource(apiLocation + 'magecom-ejb/api/card/:cardId', {cardId: '@id'}, {query: {method:'GET', isArray:true}}),
                combo: $resource(apiLocation + 'magecom-ejb/api/combo/card/:cardId', {cardId: '@id'}, {query: {method:'GET', isArray:true}}),
                deck: $resource(apiLocation + 'magecom-ejb/api/deck/card/:cardId', {cardId: '@id'}, {query: {method:'GET', isArray:true}}),
                search: $resource(apiLocation + 'magecom-ejb/api/card/search', {}, {query: {method:'GET', isArray:true}})
                }
    }]);