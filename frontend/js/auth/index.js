'use strict';
// This module describes user's login/password authentication provided by $firebaseAuth service
// You can also see dependencies at:
// - services/auth.service.js
// - auth/route.js;
// - auth/login/login.component.js;
// - shared/route.js;
// - shared/layout/layout.component.js.

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import services from '../services';

import loginComponent from './login/login.component.js';
import routingConfig from './route.js';

export default angular
    .module('auth', [uiRouter, services])
    .component('login', loginComponent)
    .config(routingConfig)
    .run(function($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the login page.
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
        });
    })
    .name;
