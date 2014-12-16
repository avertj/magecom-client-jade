'use strict';

angular.module('magecomControllers')
    .controller('DeckCtrl', ['$scope', '$log', 'Deck', function($scope, $log, Deck) {
        $scope.menu.active = 'deck';
        $scope.decks = Deck.detail.query();
        
        $scope.form = {};
        $scope.form.black = null;
        $scope.form.blue = null;
        $scope.form.green = null;
        $scope.form.red = null;
        $scope.form.white = null;

        $scope.search = function () {
            if(!$scope.form.name) delete $scope.form.name;
            if(!$scope.form.description) delete $scope.form.description;
            Deck.search.query($scope.form, function (decks) {
                $scope.decks = decks;
            });
        }

    }]).controller('DeckDetailCtrl', ['$scope', '$log', '$routeParams', 'Deck', function($scope, $log, $routeParams, Deck) {
        $scope.menu.active = 'deck';
        $scope.deck = Deck.detail.get({deckId: $routeParams.deckId});

    }]).controller('DeckEditCtrl', ['$scope', '$log', '$routeParams', '$location', '$modal', 'Deck', function($scope, $log, $routeParams, $location, $modal, Deck) {
        $scope.menu.active = 'deck';
        $scope.deck = Deck.detail.get({deckId: $routeParams.deckId}, function () {
            $scope.computeColors();
            //$scope.computeCanFavorite();
        });

        $scope.canfavorite = true;

        /*$scope.computeCanFavorite = function () {

        };

        $scope.favorite = function (tuple) {

            $scope.computeCanFavorite();
        };*/

        $scope.computeColors = function () {
            $scope.deck.color.black = false;
            $scope.deck.color.blue = false;
            $scope.deck.color.red = false;
            $scope.deck.color.green = false;
            $scope.deck.color.white = false;
            angular.forEach($scope.deck.cards, function (value, key) {
                if(value.card.color.black) $scope.deck.color.black = true;
                if(value.card.color.blue) $scope.deck.color.blue = true;
                if(value.card.color.red) $scope.deck.color.red = true;
                if(value.card.color.green) $scope.deck.color.green = true;
                if(value.card.color.white) $scope.deck.color.white = true;
            });
        };

        $scope.addToDeck = function(card, qty) {
            console.log('addToDeck');
            var index = 0;
            var found = false;
            while(!found && index < $scope.deck.cards.length) {
                if($scope.deck.cards[index].card.id == card.id) found = true;
                else index++;
            }
            if(index < $scope.deck.cards.length) {
                var newq = $scope.deck.cards[index].quantity + parseInt(qty);
                $scope.deck.cards[index].quantity = Math.max(1, newq);
            } else {
                $scope.deck.cards.push({card: card, quantity: qty, favorite: false});
                $scope.computeColors();
            }
        };
        $scope.removeFromDeck = function(card) {
            console.log('removeFromDeck');
            var index = 0;
            var found = false;
            while(!found && index < $scope.deck.cards.length) {
                if($scope.deck.cards[index].card.id == card.id) found = true;
                else index++;
            }
            if(index < $scope.deck.cards.length) {
                delete $scope.deck.cards.splice(index, 1);
                $scope.computeColors();
            }
        }

        $scope.saveDeck = function() {
            Deck.detail.put({deckId: $scope.deck.id}, $scope.deck, function (data) {
                console.log('success');
                console.log(data);
            }, function (data) {
                console.log('echec');
                console.log(data);
            });
            $location.path('/deck/' + $scope.deck.id).replace();
        }

        $scope.openSearchModal = function ($event, cardId, hideCartButton) {
            var modalInstance = $modal.open({
                templateUrl: 'CardSearchModal.html',
                controller: 'CardSearchModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function (card) {
                $scope.addToDeck(card, 1);
            }, function () {
            });
        };
    }]).controller('CardSearchModalInstanceCtrl', ['$scope', '$modalInstance', 'Card', function($scope, $modalInstance, Card) {
        $scope.cards = {};

        $scope.doSearch = function () {
            Card.search.query($scope.form, function (cards) {
                $scope.cards = cards;
            });
        };

        $scope.select = function (card) {
            $modalInstance.close(card);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);