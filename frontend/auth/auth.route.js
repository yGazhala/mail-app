'use strict';

export default function authRoute($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>',
            resolve: {
                // controller will not be loaded until $waitForAuth resolves
                currentAuth: function(AuthService, $state) {
                    return AuthService.authObj.$waitForAuth()
                        .then((authData) => {
                            // If user has been authenticated already, redirect to inbox
                            if(authData !== null) {
                                $state.go('message-list', {boxId: 'inbox'});
                            }
                        })
                }
            }
        })
}
