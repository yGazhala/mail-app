'use strict';

export default function routingConfig($stateProvider) {
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
}
