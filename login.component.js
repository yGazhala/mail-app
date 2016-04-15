'use strict';

angular
    .module('core')
    .component('login', {
        bindings: {},
        templateUrl: 'login.html'
    })

    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>'/*,
                controller: LoginStateController,
                controllerAs: 'stateCtrl',

                resolve: {
                    /
                    // controller will not be loaded until $waitForAuth resolves
                    "currentAuth": ["Auth", function(Auth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return Auth.$waitForAuth();
                    }]


                  }*/
            })
    });

//function LoginStateController(currentAuth) {
//}