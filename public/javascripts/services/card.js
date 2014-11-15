'use strict';

angular.module('magecomServices')
    .factory('Card', ['$resource', function($resource) {
        return $resource('/cards/json/:cardId.json', {}, {
            query: {method:'GET', params:{cardId: 'card'}, isArray:true}
        });
    }]);