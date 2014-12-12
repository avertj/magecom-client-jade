'use strict';

angular.module('magecomControllers')
    .controller('CartCtrl', ['$scope', '$log', 'Card', '$modal', function($scope, $log, Card, $modal) {
        $scope.menu.active = 'cart';

        $scope.openConfirmation = function () {
            var modalInstance = $modal.open({
                templateUrl: 'EmptyCartConfirm.html',
                controller: 'EmptyCartConfirmCtrl'
            });

            modalInstance.result.then(function () {
                $scope.$storage.cart = {
                    total: 0,
                    cards: []
                };
                $scope.$storage.$save();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]);

angular.module('magecomControllers')
    .controller('EmptyCartConfirmCtrl', function ($scope, $modalInstance) {
        $scope.confirm = function() {
            $modalInstance.close();
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
