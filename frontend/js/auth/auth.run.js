'use strict';

let runConfig = ['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the login page.
        if (error === 'AUTH_REQUIRED') {
            $state.go('login');
        }
    });
}];

export default runConfig;
