'use strict';

angular
    .module('auth')
    .component('login', {
        bindings: {
            checkUser: '&',
            isInvalidLoginOrPassword: '<'
        },
        templateUrl: 'auth/login.html'
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
                template: `<login check-user="$ctrl.checkUser(user)"
                                is-invalid-login-or-password = "$ctrl.isInvalidLoginOrPassword"
                                    ></login>`,
                controller: LoginStateController,
                controllerAs: '$ctrl',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    currentAuth: function(AuthService) {
                        return AuthService.authObj.$waitForAuth();

                    }
                }
            })
    });


function LoginStateController(currentAuth, AuthService, $state) {
    console.log(currentAuth);

    // helper flag for the ng-if directive at the login.html
    this.isInvalidLoginOrPassword = false;

    this.checkUser = function(user) {

        // This method will return authData or null, if authentication fails
        AuthService.authObj.$authWithPassword(user)
            .then((authData) => {
                console.log(authData);
                this.isInvalidLoginOrPassword = false;
                $state.go('message-list', {boxId: 'inbox'});
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
                this.isInvalidLoginOrPassword = true;
            });

    }
}