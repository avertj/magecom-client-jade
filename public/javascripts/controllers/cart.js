'use strict';

angular.module('magecomControllers')
    .controller('CartCtrl', ['$scope', '$log', 'Card', function($scope, $log, Card) {
        $scope.menu.active = 'cart';

    }]);