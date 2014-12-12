'use strict';

angular.module('magecomControllers')
    .controller('CardCtrl', ['$scope', '$log', 'Card', function($scope, $log, Card) {
        $scope.menu.active = 'card';
        $scope.cards = Card.detail.query();
        
        $scope.form = {};
        $scope.form.black = null;
        $scope.form.blue = null;
        $scope.form.green = null;
        $scope.form.red = null;
        $scope.form.white = null;

        $scope.search = function () {
            if(!$scope.form.name) delete $scope.form.name;
            if(!$scope.form.type) delete $scope.form.type;
            if(!$scope.form.text) delete $scope.form.text;
            Card.search.query($scope.form, function (cards) {
                $scope.cards = cards;
            });
        }

    }]).controller('CardDetailCtrl', ['$scope', '$log', '$routeParams', 'Card', function($scope, $log, $routeParams, Card) {
        $scope.menu.active = 'card';
        $scope.card = Card.detail.get({cardId: $routeParams.cardId});
        $scope.combos = Card.combo.query({cardId: $routeParams.cardId});
        $scope.decks = Card.deck.query({cardId: $routeParams.cardId});

    }]);