'use strict';

angular.module('magecomServices', ['ngResource']);
angular.module('magecomControllers', ['ngSanitize', 'ngStorage', 'ngCookies']);
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
        .when('/deck', {
            templateUrl: 'partials/deck.html',
            controller: 'DeckCtrl'
        })
        .when('/deck/:deckId', {
            templateUrl: 'partials/deck-detail.html',
            controller: 'DeckDetailCtrl'
        })
        .when('/deck/:deckId/edit', {
            templateUrl: 'partials/deck-edit.html',
            controller: 'DeckEditCtrl'
        })
        .when('/cart', {
            templateUrl: 'partials/cart.html',
            controller: 'CartCtrl'
        })
        .when('/checkout', {
            templateUrl: 'partials/checkout.html',
            controller: 'CheckoutCtrl'
        })
        .when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl'
        })
        .when('/me', {
            templateUrl: 'partials/account.html',
            controller: 'AccountCtrl'
        })
        .when('/me/collection', {
            templateUrl: 'partials/account.html',
            controller: 'AccountCtrl'
        })
        .when('/me/decks', {
            templateUrl: 'partials/account-decks.html',
            controller: 'AccountCtrl'
        })
        .when('/me/combos', {
            templateUrl: 'partials/account-combos.html',
            controller: 'AccountCtrl'
        })
        .when('/me/purchases', {
            templateUrl: 'partials/account-purchases.html',
            controller: 'AccountCtrl'
        })
        .when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});