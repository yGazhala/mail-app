'use strict';

angular
    .module('shared')
    .component('layout', {
        bindings: {},
        templateUrl: 'shared/layout.html',
        controller: LayoutController
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('account', {
                abstract: true,
                url: '/account',
                template: '<layout></layout>',
                resolve: {
                    currentAuth: function(AuthService) {
                        // $requireAuth returns a promise so the resolve waits for it to complete.
                        // If the promise is rejected, it will throw a $stateChangeError,
                        // and user will be redirected to the login page
                        return AuthService.authObj.$requireAuth();
                    }
                }
            })
    });


function LayoutController(AuthService, $state) {
    this.logout = function() {
        AuthService.authObj.$unauth();
        $state.go('login');
    }
}