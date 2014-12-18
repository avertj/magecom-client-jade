'use strict';

angular.module('magecomControllers')
    .controller('ComboCtrl', ['$scope', '$log', 'Combo', function($scope, $log, Combo) {
        $scope.menu.active = 'combo';
        $scope.combos = Combo.detail.query();
        
        $scope.form = {};
        $scope.form.black = null;
        $scope.form.blue = null;
        $scope.form.green = null;
        $scope.form.red = null;
        $scope.form.white = null;

        $scope.search = function () {
            if(!$scope.form.name) delete $scope.form.name;
            if(!$scope.form.description) delete $scope.form.description;
            Combo.search.query($scope.form, function (combos) {
                $scope.combos = combos;
            });
        }

    }]).controller('ComboDetailCtrl', ['$scope', '$log', '$routeParams', 'Combo', function($scope, $log, $routeParams, Combo) {
        $scope.menu.active = 'combo';
        $scope.combo = Combo.detail.get({comboId: $routeParams.comboId});

        $scope.addAllToCart = function () {
            angular.forEach($scope.combo.cards, function (value, key) {
                $scope.addToCart(value.card, value.quantity);
            });
        }
    }]).controller('ComboEditCtrl', ['$scope', '$log', '$routeParams', '$location', '$modal', 'Combo', function($scope, $log, $routeParams, $location, $modal, Combo) {
        $scope.menu.active = 'combo';

        if(!$scope.$sessionStorage.user)
            $location.path('/combo/' + $routeParams.comboId).replace();

        $scope.combo = Combo.detail.get({comboId: $routeParams.comboId}, function (combo) {
            if(!$scope.$sessionStorage.user || combo.member.id != $scope.$sessionStorage.user.id)
                $location.path('/combo/' + combo.id).replace();
            else {
                $scope.displayEdit = true;
                $scope.computeColors();
                $scope.computeNumberOfCards();
            }
            //$scope.computeCanFavorite();
        });

        $scope.displayEdit = false;

        /*$scope.computeCanFavorite = function () {

        };

        $scope.favorite = function (tuple) {

            $scope.computeCanFavorite();
        };*/
        $scope.manaCosts = {};
        $scope.numberOfCards = 0;

        $scope.computeNumberOfCards = function () {
            $scope.numberOfCards = 0;
            angular.forEach($scope.combo.cards, function (value, key) {
                $scope.numberOfCards += value.quantity;
            });
        }


        $scope.computeColors = function () {
            $scope.combo.color.black = false;
            $scope.combo.color.blue = false;
            $scope.combo.color.red = false;
            $scope.combo.color.green = false;
            $scope.combo.color.white = false;
            angular.forEach($scope.combo.cards, function (value, key) {
                if(value.card.color.black) $scope.combo.color.black = true;
                if(value.card.color.blue) $scope.combo.color.blue = true;
                if(value.card.color.red) $scope.combo.color.red = true;
                if(value.card.color.green) $scope.combo.color.green = true;
                if(value.card.color.white) $scope.combo.color.white = true;
            });
        }

        $scope.addToCombo = function(card, qty) {
            console.log('addToCombo');
            var index = 0;
            var found = false;
            while(!found && index < $scope.combo.cards.length) {
                if($scope.combo.cards[index].card.id == card.id) found = true;
                else index++;
            }
            if(index < $scope.combo.cards.length) {
                var newq = $scope.combo.cards[index].quantity + parseInt(qty);
                if(card.rarity != 'BASIC_LAND') 
                    newq = Math.min(newq, 3);
                $scope.combo.cards[index].quantity = Math.max(1, newq);
                $scope.computeManaCosts();
                $scope.computeNumberOfCards();
            } else {
                $scope.combo.cards.push({card: card, quantity: qty});
                $scope.computeColors();
                $scope.computeNumberOfCards();
            }
        }

        $scope.removeFromCombo = function(card) {
            console.log('removeFromCombo');
            var index = 0;
            var found = false;
            while(!found && index < $scope.combo.cards.length) {
                if($scope.combo.cards[index].card.id == card.id) found = true;
                else index++;
            }
            if(index < $scope.combo.cards.length) {
                delete $scope.combo.cards.splice(index, 1);
                $scope.computeColors();
                $scope.computeNumberOfCards();
            }
        }

        $scope.saveCombo = function() {
            $scope.combo.member.token = $scope.$sessionStorage.user.token;
            Combo.detail.put({comboId: $scope.combo.id}, $scope.combo, function (data) {
                console.log('success');
                console.log(data);
                $location.path('/combo/' + $scope.combo.id).replace();
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
                $scope.addToCombo(card, 1);
            }, function () {
            });
        };
    }]).controller('ComboNewCtrl', ['$scope', '$log', '$routeParams', '$location', '$modal', 'Combo', function($scope, $log, $routeParams, $location, $modal, Combo) {
        $scope.menu.active = 'combo';

        $scope.displayEdit = false;

        if(!$scope.$sessionStorage.user) {
            $location.path('/signup').replace();
        } else {
            $scope.displayEdit = true;
            $scope.combo = {};
            $scope.combo.cards = [];
            $scope.combo.color = {};
            $scope.manaCosts = {};
            $scope.numberOfCards = 0;
        }

        $scope.computeNumberOfCards = function () {
            $scope.numberOfCards = 0;
            angular.forEach($scope.combo.cards, function (value, key) {
                $scope.numberOfCards += value.quantity;
            });
        }

        $scope.computeColors = function () {
            $scope.combo.color.black = false;
            $scope.combo.color.blue = false;
            $scope.combo.color.red = false;
            $scope.combo.color.green = false;
            $scope.combo.color.white = false;
            angular.forEach($scope.combo.cards, function (value, key) {
                if(value.card.color.black) $scope.combo.color.black = true;
                if(value.card.color.blue) $scope.combo.color.blue = true;
                if(value.card.color.red) $scope.combo.color.red = true;
                if(value.card.color.green) $scope.combo.color.green = true;
                if(value.card.color.white) $scope.combo.color.white = true;
            });
        };

        $scope.addToCombo = function(card, qty) {
            var index = 0;
            var found = false;
            while(!found && index < $scope.combo.cards.length) {
                if($scope.combo.cards[index].card.id == card.id) found = true;
                else index++;
            }
            if(index < $scope.combo.cards.length) {
                var newq = $scope.combo.cards[index].quantity + parseInt(qty);
                if(card.rarity != 'BASIC_LAND') 
                    newq = Math.min(newq, 3);
                $scope.combo.cards[index].quantity = Math.max(1, newq);
                $scope.computeNumberOfCards();
            } else {
                $scope.combo.cards.push({card: card, quantity: qty});
                $scope.computeColors();
                $scope.computeNumberOfCards();
            }
        };
        $scope.removeFromCombo = function(card) {
            var index = 0;
            var found = false;
            while(!found && index < $scope.combo.cards.length) {
                if($scope.combo.cards[index].card.id == card.id) found = true;
                else index++;
            }
            if(index < $scope.combo.cards.length) {
                delete $scope.combo.cards.splice(index, 1);
                $scope.computeColors();
                $scope.computeNumberOfCards();
            }
        }

        $scope.saveCombo = function() {
            $scope.combo.member = $scope.$sessionStorage.user;
            Combo.detail.post($scope.combo, function (data) {
                console.log('success');
                console.log(data);
                $location.path('/combo/' + data.id).replace();
            }, function (data) {
                console.log('echec');
                console.log(data);
            });
            //$location.path('/combo/' + $scope.combo.id).replace();
        }

        $scope.openSearchModal = function ($event, cardId, hideCartButton) {
            var modalInstance = $modal.open({
                templateUrl: 'CardSearchModal.html',
                controller: 'CardSearchModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function (card) {
                $scope.addToCombo(card, 1);
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