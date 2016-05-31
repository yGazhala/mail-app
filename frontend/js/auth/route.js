'use strict';

/*@ngInject*/
export default function routingConfig($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>',
            resolve: {
                // controller will not be loaded until waitForAuth resolves
                currentAuth: /*@ngInject*/ function(AuthService, $state) {
                    return AuthService.waitForAuth()
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
