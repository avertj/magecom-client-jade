'use strict';

angular.module('magecomServices')
    .factory('Combo', ['$resource', 'apiLocation', function($resource, apiLocation) {
        return  {
                detail: $resource(apiLocation + 'magecom-ejb/api/combo/:comboId', {comboId: '@id'}, {query: {method:'GET', isArray:true}, put: {method:'PUT'}, post: {method:'POST'}, del: {method:'DELETE'}}),
                search: $resource(apiLocation + 'magecom-ejb/api/combo/search', {}, {query: {method:'GET', isArray:true}})
                }
    }]);