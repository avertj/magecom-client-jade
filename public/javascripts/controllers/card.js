'use strict';

angular.module('magecomControllers')
    .controller('CardCtrl', ['$scope', '$log', 'Card', function($scope, $log, Card) {
        $scope.menu.active = 'card';
        $scope.cards = Card.query();

        $scope.radioB = 'Ignore';
        $scope.radioW = 'Ignore';
        $scope.radioR = 'Ignore';
        $scope.radioU = 'Ignore';
        $scope.radioG = 'Ignore';

    }]).controller('CardDetailCtrl', ['$scope', '$log', '$routeParams', 'Card', function($scope, $log, $routeParams, Card) {
        $scope.menu.active = 'card';
        $scope.card = Card.get({cardId: $routeParams.cardId});

    }]);