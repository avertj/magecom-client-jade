'use strict';

angular.module('magecomServices')
    .factory('Member', ['$resource', function($resource) {
        return  {
                detail: $resource('http://localhost:8080/magecom-ejb/api/member/:memberId', {memberId: '@id'}, {query: {method:'GET', isArray:true}, post: {method:'POST'}}),
                //collection: $resource('http://localhost:8080/magecom-ejb/api/member/:memberId/collection', {memberId: '@id'}, {query: {method:'GET', isArray:true}}),
                combos: $resource('http://localhost:8080/magecom-ejb/api/combo/member/:memberId', {memberId: '@id'}, {query: {method:'GET', isArray:true}}),
                decks: $resource('http://localhost:8080/magecom-ejb/api/deck/member/:memberId', {memberId: '@id'}, {query: {method:'GET', isArray:true}}),
                full: $resource('http://localhost:8080/magecom-ejb/api/member/:memberId/full', {memberId: '@id'}, {query: {method:'GET'}})
                }
    }]);