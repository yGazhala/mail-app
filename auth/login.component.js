'use strict';

angular
    .module('auth')
    .component('login', {
        bindings: {},
        templateUrl: 'auth/login.html',
        controller: LoginController
    })

    .run(function($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the login page
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
        });
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: `<login></login>`,
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
    });


function LoginController(AuthService, $state) {

    // helper flag for the ng-if directive at the login.html
    this.isInvalidLoginOrPassword = false;

    this.checkUser = function(user) {

        AuthService.authObj.$authWithPassword(user)
            .then(() => {
                this.isInvalidLoginOrPassword = false;
                $state.go('message-list', {boxId: 'inbox'});
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
                this.isInvalidLoginOrPassword = true;
            });

    }
}