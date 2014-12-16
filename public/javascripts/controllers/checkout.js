'use strict';

angular.module('magecomControllers')
    .controller('CheckoutCtrl', ['$scope', '$log', '$location', 'Member', 'Purchase', function($scope, $log, $location, Member, Purchase) {
        $scope.menu.active = 'cart';
        //$scope.setCurrentUser(null);

        $scope.state = 'details';
        $scope.mustlog = false;

        $scope.status = 'waiting';

        if($scope.$storage.cart.cards.length == 0) {
            $scope.cancel();
        }

        if(!$scope.$sessionStorage.user) {
            $scope.mustlog = true;
        }

        $scope.forward = function () {
            if($scope.state == 'details') {
                $scope.state = 'review';
            }
            else if($scope.state == 'review') {
                $scope.state = 'done';
                $scope.purchase();
            }
        }

        $scope.back = function () {
            if($scope.state == 'details') {
                $scope.cancel();
            }
            else if($scope.state == 'review') {
                $scope.state = 'details';
            }

        }

        $scope.cancel = function () {
            $location.path('/cart').replace();
        }

        $scope.fillFields = function() {
            $scope.member = Member.full.query({memberId: $scope.$sessionStorage.user.id, token: $scope.$sessionStorage.user.token}, {memberId: $scope.$sessionStorage.user.id});
        }

        $scope.purchase = function () {
            angular.forEach($scope.$storage.cart.cards, function (value, key) {
                delete value.id;
            });
            var purchase = {
                lastName: $scope.member.lastName,
                firstName: $scope.member.firstName,
                address: $scope.member.address,
                additionalInformation: $scope.member.additionalInformation,
                zipCode: $scope.member.zipCode,
                city: $scope.member.city,
                country: $scope.member.country,
                total: $scope.$storage.cart.total,
                member: $scope.$sessionStorage.user,
                cards: $scope.$storage.cart.cards
            }
            Purchase.post.query(purchase, function () {
                $scope.status = 'success';
                $scope.$storage.cart = {
                    total: 0,
                    cards: []
                };
                $scope.$storage.$save();
            }, function () {
                $scope.status = 'error';
            });
        }

        $scope.$watch(function() { return $scope.$sessionStorage.user; }, function (newvalue) {
            if(newvalue) {
                $scope.mustlog = false;
                $scope.fillFields();
            } else {
                $scope.mustlog = true;
            }
        });



    }]);

