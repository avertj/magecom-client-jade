'use strict';

angular.module('magecomControllers')
    .controller('GlobalCtrl', ['$scope', '$log', '$modal', '$localStorage', '$sessionStorage', '$http', '$filter', 'Card', 'apiLocation', 'cdnLocation', function($scope, $log, $modal, $localStorage, $sessionStorage, $http, $filter, Card, apiLocation, cdnLocation) {
        $scope.menu = {
            active: 'home'
        };

        $scope.cdnLocation = cdnLocation;
        $scope.$storage = $localStorage;
        $scope.$sessionStorage = $sessionStorage;

        if(!$scope.$storage.cart) {
            $scope.$storage.cart = {
                total: 0,
                cards: []
            };
        }
        if(!$scope.$sessionStorage.user) {
            $scope.$sessionStorage.user = null;
        } else {
            if($scope.$sessionStorage.user.token) {
                $http.post(apiLocation + 'magecom-ejb/api/auth/validate', $scope.$sessionStorage.user).
                    success(function(data, status, headers, config) {
                    }).
                    error(function(data, status, headers, config) {
                        $scope.$sessionStorage.user = null;
                        $scope.$sessionStorage.$save();
                    });
            } else {
                $scope.$sessionStorage.user = null;
            }
        }

        $scope.$storage.$save();
        $scope.$sessionStorage.$save();

        $scope.computeCartTotal = function() {
            var total = 0;
            angular.forEach($scope.$storage.cart.cards, function (value, key) {
                total += value.card.price * value.quantity;
            });
            $scope.$storage.cart.total = total;
        };

        $scope.addToCart = function (card, quantity) {
            var found = $filter('filter')($scope.$storage.cart.cards, {id: card.id}, true);
            if(found && found.length > 0) { // maj quantité
                var newq = found[0].quantity + parseInt(quantity);
                found[0].quantity = Math.max(1, newq);

            } else {
                $scope.$storage.cart.cards.push({id: card.id, card: card, quantity: quantity});
            }
            $scope.computeCartTotal();
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
            $scope.computeCartTotal();
            $scope.$storage.$save();
        }

        $scope.setCurrentUser = function (user) {
            $scope.$sessionStorage.user = user;
            $scope.$sessionStorage.$save();
        };

        $scope.openCardModal = function ($event, cardId, hideCartButton) {
            if($event.type == 'click' && $event.button == 0) {
                $event.preventDefault();
                var hideButton = typeof hideCartButton !== 'undefined' ? hideCartButton : false;
                var card = Card.detail.get({cardId: cardId});
                var modalInstance = $modal.open({
                    templateUrl: 'partials/card-modal.html',
                    controller: 'CardModalInstanceCtrl',
                    resolve: {
                        card: function () {
                            return card;
                        },
                        hideCartButton: function() {
                            return hideButton;// ? true : false
                        },

                    }
                });

                modalInstance.result.then(function (outcome) {
                    if(outcome == 'addToCart') $scope.addToCart(card, 1);
                }, function () {
                });
            }
        };
        $scope.openLoginModal = function () { // a remplacer par card id
            var modalInstance = $modal.open({
                templateUrl: 'partials/login-modal.html',
                controller: 'LoginModalInstanceCtrl'
            });

            modalInstance.result.then(function (outcome) { 
                $scope.setCurrentUser(outcome);
            }, function () {
            });
        };
        $scope.logout = function () {
            $scope.$sessionStorage.user = null;
            $scope.$sessionStorage.$save();
        };
    }]);

angular.module('magecomControllers')
    .controller('CardModalInstanceCtrl', function ($scope, $modalInstance, card, hideCartButton, cdnLocation) {
        $scope.card = card;
        $scope.hideCartButton = hideCartButton;
        $scope.cdnLocation = cdnLocation;
        
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
    .controller('LoginModalInstanceCtrl', function ($scope, $modalInstance, $http, $log, apiLocation) {

        $scope.error = false;
        $scope.form = {};

        $scope.login = function () {
            $scope.error = false;
            $http.post(apiLocation + 'magecom-ejb/api/auth/login', $scope.form)
                .success(function(data, status, headers, config) {
                    $modalInstance.close(data);
                }).error(function(data, status, headers, config) {
                    $scope.error = true;
                });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });