'use strict';

angular.module('magecomServices')
    .factory('Purchase', ['$resource', 'apiLocation', function($resource, apiLocation) {
        return  {
                post: $resource(apiLocation + 'magecom-ejb/api/purchase/', {}, {query: {method:'POST'}}),
                member: $resource(apiLocation + 'magecom-ejb/api/purchase/member/:memberId', {memberId: '@id'}, {query: {method:'GET', isArray:true}})
                }
    }]);