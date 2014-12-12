'use strict';

angular.module('magecomControllers')
    .controller('MainCtrl', ['$scope', '$log', '$modal', 'Card', function($scope, $log, $modal, Card) {
        $scope.menu.active = 'home';
        //$scope.setCurrentUser(null);
        $scope.cards = Card.detail.query();
    }]);

