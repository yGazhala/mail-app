'use strict';

/*@ngInject*/
export default function routingConfig($stateProvider) {
    $stateProvider
        .state('account', {
            abstract: true,
            url: '/account',
            template: '<layout></layout>',
            resolve: {
                currentAuth: /*@ngInject*/ function(AuthService) {
                    // requireAuth returns a promise so the resolve waits for it to complete.
                    // If the promise is rejected, it will throw a $stateChangeError,
                    // and user will be redirected to the login page.
                    // See dependencies at the auth/index.js and at the auth/route.js
                    return AuthService.requireAuth();
                }
            }
        })
}
