'use strict';

angular.module('magecomServices')
    .factory('Member', ['$resource', 'apiLocation', function($resource, apiLocation) {
        return  {
                detail: $resource(apiLocation + 'magecom-ejb/api/member/:memberId', {memberId: '@id'}, {query: {method:'GET', isArray:true}, post: {method:'POST'}, get: {method:'GET'}}),
                //collection: $resource(apiLocation + 'magecom-ejb/api/member/:memberId/collection', {memberId: '@id'}, {query: {method:'GET', isArray:true}}),
                combos: $resource(apiLocation + 'magecom-ejb/api/combo/member/:memberId', {memberId: '@id'}, {query: {method:'GET', isArray:true}}),
                decks: $resource(apiLocation + 'magecom-ejb/api/deck/member/:memberId', {memberId: '@id'}, {query: {method:'GET', isArray:true}}),
                full: $resource(apiLocation + 'magecom-ejb/api/member/:memberId/full', {memberId: '@id'}, {query: {method:'GET'}})
                }
    }]);