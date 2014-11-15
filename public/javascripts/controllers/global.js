'use strict';

angular.module('magecomControllers')
    .controller('GlobalCtrl', ['$scope', '$log', '$modal', '$localStorage', '$filter', 'Card', function($scope, $log, $modal, $localStorage, $filter, Card) {
        $scope.currentUser = null;
        $scope.menu = {
            active: 'home'
        };

        $scope.$storage = $localStorage;
        if(!$scope.$storage.cart) {
            $scope.$storage.cart = {
                total: 0,
                cards: []
            };
        }
        //$scope.cart = $localStorage.cart;

        $scope.computeTotal = function() {
            var total = 0;
            angular.forEach($scope.$storage.cart.cards, function (value, key) {
                total += value.price * value.quantity;
            });
            $scope.$storage.cart.total = total;
        };

        $scope.addToCart = function (card, quantity) {
            var found = $filter('filter')($scope.$storage.cart.cards, {id: card.id}, true);
            if(found && found.length > 0) { // maj quantité
                var newq = found[0].quantity + parseInt(quantity);
                found[0].quantity = Math.max(1, newq);

            } else {
                $scope.$storage.cart.cards.push({id: card.id, card: card, price: Math.floor((Math.random() * 10) + 1), quantity: quantity});
            }
            $scope.computeTotal();
            $scope.$storage.$save();
        }
        $scope.removeFromCart = function (card) {
            var index = 0;
            var found = false;
            while(!found && index < $scope.$storage.cart.cards.length) {
                if($scope.$storage.cart.cards[index].id == card.id) found = true;
                else index++;
            }
            if(index < $scope.$storage.cart.cards.length) {
                //delete $scope.$storage.cart.cards[index];
                delete $scope.$storage.cart.cards.splice(index, 1);
            }
            $scope.computeTotal();
            $scope.$storage.$save();
        }

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

        $scope.openCardModal = function ($event, cardId, hideCartButton) {
            if($event.type == 'click' && $event.button == 0) {
                $event.preventDefault();
                var hideButton = typeof hideCartButton !== 'undefined' ? hideCartButton : false;
                var card = Card.get({cardId: cardId});
                var modalInstance = $modal.open({
                    templateUrl: 'partials/card-modal.html',
                    controller: 'CardModalInstanceCtrl',
                    resolve: {
                        card: function () {
                            return card;
                        },
                        hideCartButton: function() {
                            return hideButton;// ? true : false
                        }
                    }
                });

                modalInstance.result.then(function (outcome) {
                    if(outcome == 'addToCart') $scope.addToCart(card, 1);
                    $log.info('CardModal outcome : ' + outcome);
                }, function () {
                    $log.info('CardModal dismissed at: ' + new Date());
                });
            }
        };
        $scope.openLoginModal = function () { // a remplacer par card id
            var modalInstance = $modal.open({
                templateUrl: 'partials/login-modal.html',
                controller: 'LoginModalInstanceCtrl'
            });

            modalInstance.result.then(function (outcome) { 
                $log.info('LoginModal outcome : ' + outcome);
            }, function () {
                $log.info('LoginModal dismissed at: ' + new Date());
            });
        };
    }]);

angular.module('magecomControllers')
    .controller('CardModalInstanceCtrl', function ($scope, $modalInstance, card, hideCartButton) {
        $scope.card = card;
        $scope.hideCartButton = hideCartButton;

        $scope.addToCart = function () {
            $modalInstance.close('addToCart', card);
        };

        $scope.goToPage = function () {
            $modalInstance.close('goToPage');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
angular.module('magecomControllers')
    .controller('LoginModalInstanceCtrl', function ($scope, $modalInstance) {

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });