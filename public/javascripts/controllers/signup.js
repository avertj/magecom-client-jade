'use strict';

angular.module('magecomControllers')
    .controller('SignupCtrl', ['$scope', '$log', '$location', '$http', 'Member', 'apiLocation', function($scope, $log, $location, $http, Member, apiLocation) {
        $scope.menu.active = 'signup';

        if($scope.$sessionStorage.user) {
            $location.path('/me').replace();
        }

        $scope.formSignup = {};
        $scope.formSignup.passwordchk = '';
        $scope.formSignup.password = '';
        $scope.usernameerror = false;
        $scope.emailerror = false;
        $scope.error = false;
        $scope.success = false;

        $scope.$watch(function() { return $scope.formSignup.passwordchk; }, function (newvalue) {
            if(newvalue == $scope.formSignup.password) {
                $scope.passworderror = false;
            } else {
                $scope.passworderror = true;
            }
        });
        $scope.$watch(function() { return $scope.formSignup.password; }, function (newvalue) {
            if(newvalue == $scope.formSignup.passwordchk) {
                $scope.passworderror = false;
            } else {
                $scope.passworderror = true;
            }
        });

        $scope.signup = function () {
            $scope.usernameerror = false;
            $scope.emailerror = false;
            $scope.error = false;
            var data = angular.copy($scope.formSignup);
            delete data.passwordchk;
            Member.detail.post(data, function (data) {
                $http.post(apiLocation + 'magecom-ejb/api/auth/login', {username: data.username, password: data.password})
                .success(function(data, status, headers, config) {
                    $scope.setCurrentUser(data);
                })
                $location.path('/me').replace();
            }, function (data) {
                if(data.data.field == 'username') {
                    $scope.usernameerror = true;
                } else if(data.data.field == 'email') {
                    $scope.emailerror = true;
                } else {
                    $scope.error = true;
                }
                //$log.log('signup failure', data.data.field);
            });
        };

    }]);

