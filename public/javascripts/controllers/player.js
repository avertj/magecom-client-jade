'use strict';

angular.module('magecomControllers')
    .controller('PlayerCtrl', ['$scope', '$log', 'Member', function($scope, $log, Member) {
        $scope.menu.active = 'player';
        $scope.players = Member.detail.query();
        

    }]).controller('PlayerDetailCtrl', ['$scope', '$log', '$routeParams', 'Member', function($scope, $log, $routeParams, Member) {
        $scope.menu.active = 'player';

        $scope.player = Member.detail.get({memberId: $routeParams.playerId});

    }]);