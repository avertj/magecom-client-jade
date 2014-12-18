'use strict';

angular.module('magecomControllers')
    .controller('AccountCtrl', ['$scope', '$log', '$modal', 'Member', 'Deck', function($scope, $log, $modal, Member, Deck) {
        $scope.menu.active = 'account';

        $scope.mustlog = false;

        if(!$scope.$sessionStorage.user) {
            $scope.mustlog = true;
        }

        $scope.$watch(function() { return $scope.$sessionStorage.user; }, function (newvalue) {
            if(newvalue) {
                $scope.mustlog = false;
                $scope.fillFields();
            } else {
                $scope.mustlog = true;
            }
        });

        $scope.fillFields = function() {
            $scope.member = Member.full.query({memberId: $scope.$sessionStorage.user.id, token: $scope.$sessionStorage.user.token}, {memberId: $scope.$sessionStorage.user.id});
        }
        //$scope.member = Member.full.query({memberId: $scope.$sessionStorage.user.id, token: $scope.$sessionStorage.user.token}, {memberId: $scope.$sessionStorage.user.id});
        //$scope.setCurrentUser(null);

        $scope.deleteDeck = function (deck) {
            var modalInstance = $modal.open({
                templateUrl: 'DeleteDeckConfirm.html',
                controller: 'DeleteDeckConfirmCtrl'
            });

            modalInstance.result.then(function () {
                Deck.detail.del({deckId: deck.id, token: $scope.$sessionStorage.user.token}, function () {
                    console.log('deleted');
                    $scope.member.decks.splice($scope.member.decks.indexOf(deck), 1);
                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.deleteCombo = function (combo) {
            var modalInstance = $modal.open({
                templateUrl: 'DeleteComboConfirm.html',
                controller: 'DeleteComboConfirmCtrl'
            });

            modalInstance.result.then(function () {
                Deck.detail.del({comboId: combo.id, token: $scope.$sessionStorage.user.token}, function () {
                    console.log('deleted');
                    $scope.member.combos.splice($scope.member.combos.indexOf(combo), 1);
                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]);

angular.module('magecomControllers')
    .controller('DeleteDeckConfirmCtrl', function ($scope, $modalInstance) {
        $scope.confirm = function() {
            $modalInstance.close();
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
angular.module('magecomControllers')
    .controller('DeleteComboConfirmCtrl', function ($scope, $modalInstance) {
        $scope.confirm = function() {
            $modalInstance.close();
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
