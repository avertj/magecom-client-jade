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
        .when('/deck/new', {
            templateUrl: 'partials/deck-edit.html',
            controller: 'DeckNewCtrl'
        })
        .when('/deck/:deckId', {
            templateUrl: 'partials/deck-detail.html',
            controller: 'DeckDetailCtrl'
        })
        .when('/deck/:deckId/edit', {
            templateUrl: 'partials/deck-edit.html',
            controller: 'DeckEditCtrl'
        })
        .when('/combo', {
            templateUrl: 'partials/combo.html',
            controller: 'ComboCtrl'
        })
        .when('/combo/new', {
            templateUrl: 'partials/combo-edit.html',
            controller: 'ComboNewCtrl'
        })
        .when('/combo/:comboId', {
            templateUrl: 'partials/combo-detail.html',
            controller: 'ComboDetailCtrl'
        })
        .when('/combo/:comboId/edit', {
            templateUrl: 'partials/combo-edit.html',
            controller: 'ComboEditCtrl'
        })
        .when('/player', {
            templateUrl: 'partials/player.html',
            controller: 'PlayerCtrl'
        })
        .when('/player/:playerId', {
            templateUrl: 'partials/player-detail.html',
            controller: 'PlayerDetailCtrl'
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