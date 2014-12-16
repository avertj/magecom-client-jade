'use strict';

angular.module('magecomServices')
    .factory('Purchase', ['$resource', function($resource) {
        return  {
                post: $resource('http://localhost:8080/magecom-ejb/api/purchase/', {}, {query: {method:'POST'}}),
                member: $resource('http://localhost:8080/magecom-ejb/api/purchase/member/:memberId', {memberId: '@id'}, {query: {method:'GET', isArray:true}})
                }
    }]);