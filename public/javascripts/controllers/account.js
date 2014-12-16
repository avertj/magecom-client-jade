'use strict';

angular.module('magecomControllers')
    .controller('AccountCtrl', ['$scope', '$log', 'Member', function($scope, $log, Member) {
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
    }]);

