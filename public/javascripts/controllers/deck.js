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

    //}]).controller('DeckUtilsCtrl', ['$scope', '$log', 'Deck', function($scope, $log, Deck) {


    }]).controller('DeckDetailCtrl', ['$scope', '$log', '$routeParams', 'Deck', function($scope, $log, $routeParams, Deck) {
        $scope.menu.active = 'deck';
        $scope.deck = Deck.detail.get({deckId: $routeParams.deckId}, function () {
            $scope.computeNumberOfCards();
            $scope.computeManaCosts();
        });

        $scope.manaCosts = {};
        $scope.numberOfCards = 0;

        $scope.computeNumberOfCards = function () {
            $scope.numberOfCards = 0;
            angular.forEach($scope.deck.cards, function (value, key) {
                $scope.numberOfCards += value.quantity;
            });
        }

        $scope.computeManaCosts = function () {
            $scope.manaCosts.zero = 0;
            $scope.manaCosts.one = 0;
            $scope.manaCosts.two = 0;
            $scope.manaCosts.three = 0;
            $scope.manaCosts.four = 0;
            $scope.manaCosts.five = 0;
            $scope.manaCosts.six = 0;
            $scope.manaCosts.seven = 0;
            $scope.manaCosts.eightplus = 0;
            angular.forEach($scope.deck.cards, function (value, key) {
                if(value.card.rarity != 'BASIC_LAND') {
                    switch(value.card.convertedManaCost) {
                        case 0: $scope.manaCosts.zero++; break;
                        case 1: $scope.manaCosts.one++; break;
                        case 2: $scope.manaCosts.two++; break;
                        case 3: $scope.manaCosts.three++; break;
                        case 4: $scope.manaCosts.four++; break;
                        case 5: $scope.manaCosts.five++; break;
                        case 6: $scope.manaCosts.six++; break;
                        case 7: $scope.manaCosts.seven++; break;
                        default: $scope.manaCosts.eightplus++; break
                    }
                }
            });
        }
        
        $scope.addAllToCart = function () {
            angular.forEach($scope.deck.cards, function (value, key) {
                $scope.addToCart(value.card, value.quantity);
            });
        }
    }]).controller('DeckEditCtrl', ['$scope', '$log', '$routeParams', '$location', '$modal', 'Deck', function($scope, $log, $routeParams, $location, $modal, Deck) {
        $scope.menu.active = 'deck';

        if(!$scope.$sessionStorage.user)
            $location.path('/deck/' + $routeParams.deckId).replace();

        $scope.deck = Deck.detail.get({deckId: $routeParams.deckId}, function (deck) {
            if(!$scope.$sessionStorage.user || deck.member.id != $scope.$sessionStorage.user.id)
                $location.path('/deck/' + deck.id).replace();
            else {
                $scope.displayEdit = true;
                $scope.computeColors();
                $scope.computeManaCosts();
            }
            //$scope.computeCanFavorite();
        });

        $scope.displayEdit = false;
        $scope.canfavorite = true;

        /*$scope.computeCanFavorite = function () {

        };

        $scope.favorite = function (tuple) {

            $scope.computeCanFavorite();
        };*/
        $scope.manaCosts = {};
        $scope.numberOfCards = 0;

        $scope.computeNumberOfCards = function () {
            $scope.numberOfCards = 0;
            angular.forEach($scope.deck.cards, function (value, key) {
                $scope.numberOfCards += value.quantity;
            });
        }

        $scope.computeManaCosts = function () {
            $scope.manaCosts.zero = 0;
            $scope.manaCosts.one = 0;
            $scope.manaCosts.two = 0;
            $scope.manaCosts.three = 0;
            $scope.manaCosts.four = 0;
            $scope.manaCosts.five = 0;
            $scope.manaCosts.six = 0;
            $scope.manaCosts.seven = 0;
            $scope.manaCosts.eightplus = 0;
            angular.forEach($scope.deck.cards, function (value, key) {
                if(value.card.rarity != 'BASIC_LAND') {
                    switch(value.card.convertedManaCost) {
                        case 0: $scope.manaCosts.zero++; break;
                        case 1: $scope.manaCosts.one++; break;
                        case 2: $scope.manaCosts.two++; break;
                        case 3: $scope.manaCosts.three++; break;
                        case 4: $scope.manaCosts.four++; break;
                        case 5: $scope.manaCosts.five++; break;
                        case 6: $scope.manaCosts.six++; break;
                        case 7: $scope.manaCosts.seven++; break;
                        default: $scope.manaCosts.eightplus++; break
                    }
                }
            });
        }

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
        }

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
                if(card.rarity != 'BASIC_LAND') 
                    newq = Math.min(newq, 3);
                $scope.deck.cards[index].quantity = Math.max(1, newq);
                $scope.computeManaCosts();
                $scope.computeNumberOfCards();
            } else {
                $scope.deck.cards.push({card: card, quantity: qty, favorite: false});
                $scope.computeColors();
                $scope.computeManaCosts();
                $scope.computeNumberOfCards();
            }
        }

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
                $scope.computeManaCosts();
                $scope.computeNumberOfCards();
            }
        }

        $scope.saveDeck = function() {
            $scope.deck.member.token = $scope.$sessionStorage.user.token;
            Deck.detail.put({deckId: $scope.deck.id}, $scope.deck, function (data) {
                console.log('success');
                console.log(data);
                $location.path('/deck/' + $scope.deck.id).replace();
            }, function (data) {
                console.log('echec');
                console.log(data);
            });
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
    }]).controller('DeckNewCtrl', ['$scope', '$log', '$routeParams', '$location', '$modal', 'Deck', function($scope, $log, $routeParams, $location, $modal, Deck) {
        $scope.menu.active = 'deck';

        $scope.displayEdit = false;

        if(!$scope.$sessionStorage.user) {
            $location.path('/signup').replace();
        } else {
            $scope.displayEdit = true;
            $scope.deck = {};
            $scope.deck.cards = [];
            $scope.deck.color = {};
            $scope.canfavorite = true;
            $scope.manaCosts = {};
            $scope.numberOfCards = 0;
        }

        $scope.computeNumberOfCards = function () {
            $scope.numberOfCards = 0;
            angular.forEach($scope.deck.cards, function (value, key) {
                $scope.numberOfCards += value.quantity;
            });
        }

        $scope.computeManaCosts = function () {
            $scope.manaCosts.zero = 0;
            $scope.manaCosts.one = 0;
            $scope.manaCosts.two = 0;
            $scope.manaCosts.three = 0;
            $scope.manaCosts.four = 0;
            $scope.manaCosts.five = 0;
            $scope.manaCosts.six = 0;
            $scope.manaCosts.seven = 0;
            $scope.manaCosts.eightplus = 0;
            angular.forEach($scope.deck.cards, function (value, key) {
                if(value.card.rarity != 'BASIC_LAND') {
                    switch(value.card.convertedManaCost) {
                        case 0: $scope.manaCosts.zero += value.quantity; break;
                        case 1: $scope.manaCosts.one += value.quantity; break;
                        case 2: $scope.manaCosts.two += value.quantity; break;
                        case 3: $scope.manaCosts.three += value.quantity; break;
                        case 4: $scope.manaCosts.four += value.quantity; break;
                        case 5: $scope.manaCosts.five += value.quantity; break;
                        case 6: $scope.manaCosts.six += value.quantity; break;
                        case 7: $scope.manaCosts.seven += value.quantity; break;
                        default: $scope.manaCosts.eightplus += value.quantity; break
                    }
                }
            });
        }

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
            var index = 0;
            var found = false;
            while(!found && index < $scope.deck.cards.length) {
                if($scope.deck.cards[index].card.id == card.id) found = true;
                else index++;
            }
            if(index < $scope.deck.cards.length) {
                var newq = $scope.deck.cards[index].quantity + parseInt(qty);
                if(card.rarity != 'BASIC_LAND') 
                    newq = Math.min(newq, 3);
                $scope.deck.cards[index].quantity = Math.max(1, newq);
                $scope.computeManaCosts();
                $scope.computeNumberOfCards();
            } else {
                $scope.deck.cards.push({card: card, quantity: qty, favorite: false});
                $scope.computeColors();
                $scope.computeManaCosts();
                $scope.computeNumberOfCards();
            }
        };
        $scope.removeFromDeck = function(card) {
            var index = 0;
            var found = false;
            while(!found && index < $scope.deck.cards.length) {
                if($scope.deck.cards[index].card.id == card.id) found = true;
                else index++;
            }
            if(index < $scope.deck.cards.length) {
                delete $scope.deck.cards.splice(index, 1);
                $scope.computeColors();
                $scope.computeManaCosts();
                $scope.computeNumberOfCards();
            }
        }

        $scope.saveDeck = function() {
            $scope.deck.member = $scope.$sessionStorage.user;
            Deck.detail.post($scope.deck, function (data) {
                console.log('success');
                console.log(data);
                $location.path('/deck/' + data.id).replace();
            }, function (data) {
                console.log('echec');
                console.log(data);
            });
            //$location.path('/deck/' + $scope.deck.id).replace();
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
    }]).controller('CardSearchModalInstanceCtrl', ['$scope', 'cdnLocation', '$modalInstance', 'Card', function($scope, cdnLocation, $modalInstance, Card) {
        $scope.cards = {};
        $scope.cdnLocation = cdnLocation;
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