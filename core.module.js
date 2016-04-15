'use strict';
angular
    .module('core', [
        'shared',
        'mailBox',
        'contacts',
        'auth'
    ]);

/*
angular.module('core')
    .run(["$rootScope", "$state", function($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the login page
            if (error === "AUTH_REQUIRED") {
                $state.go("login");
            }
        });
    }])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider

            .state("account", {
                controller: "AccountCtrl",
                templateUrl: "views/account.html",
                resolve: {
                    // controller will not be loaded until $requireAuth resolves
                    "currentAuth": ["Auth", function(Auth) {
                        // $requireAuth returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError
                        return Auth.$requireAuth();
                    }]
                }
            });
    }]);
*/
