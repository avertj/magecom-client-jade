'use strict';

angular.module('magecomServices', ['ngResource']);
angular.module('magecomControllers', ['ngSanitize', 'ngStorage']);
angular.module('magecomFilters', []);
angular.module('magecomDirectives', []);

var app = angular.module('magecom', ['ngRoute', 'ui.bootstrap', 'magecomServices', 'magecomControllers', 'magecomFilters', 'magecomDirectives']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
        })
        .when('/card', {
            templateUrl: 'partials/card.html',
            controller: 'CardCtrl'
        })
        .when('/card/:cardId', {
            templateUrl: 'partials/card-detail.html',
            controller: 'CardDetailCtrl'
        })
        .when('/cart', {
            templateUrl: 'partials/cart.html',
            controller: 'CartCtrl'
        })
        .when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});