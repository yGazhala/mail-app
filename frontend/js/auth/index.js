'use strict';
// This module describes user's login/password authentication provided by $firebaseAuth service
// You can also see dependencies at:
// - services/auth.service.js;
// - shared/shared.routes.js;
// - shared/layout/layout.html;


import angular from 'angular';
import uiRouter from 'angular-ui-router';

import services from '../services';
import shared from '../shared';

import loginComponent from './login/login.component.js';
import logoutComponent from './logout/logout.component.js';
import routerConfig from './auth.routes.js';
import runConfig from './auth.run.js';

export default angular
    .module('auth', [uiRouter, services, shared])
    .component('login', loginComponent)
    .component('logout', logoutComponent)
    .config(routerConfig)
    .run(runConfig)
    .name;
