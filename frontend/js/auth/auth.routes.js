'use strict';

routerConfig.$inject = ['$stateProvider'];
function routerConfig ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>',
            // controller will not be loaded until waitForAuth resolves
            resolve: {
                currentAuth: ['AuthService', '$state', function(AuthService, $state) {
                    return AuthService.waitForAuth()
                        .then((authData) => {
                            // If user has been authenticated already, redirect to inbox
                            if(authData !== null) {
                                $state.go('message-list', {boxId: 'inbox'});
                            }
                        })
                }]
            }
        })
}

export default routerConfig;