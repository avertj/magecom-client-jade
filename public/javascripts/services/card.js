'use strict';

angular.module('magecomServices')
    .factory('Card', ['$resource', function($resource) {
        return  {
                detail: $resource('http://localhost:8080/magecom-ejb/api/card/:cardId', {cardId: '@id'}, {query: {method:'GET', isArray:true}}),
                combo: $resource('http://localhost:8080/magecom-ejb/api/combo/card/:cardId', {cardId: '@id'}, {query: {method:'GET', isArray:true}}),
                deck: $resource('http://localhost:8080/magecom-ejb/api/deck/card/:cardId', {cardId: '@id'}, {query: {method:'GET', isArray:true}}),
                search: $resource('http://localhost:8080/magecom-ejb/api/card/search', {}, {query: {method:'GET', isArray:true}})
                }
    }]);