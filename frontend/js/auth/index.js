'use strict';
// This module describes user's login/password authentication provided by $firebaseAuth service
// You can also see dependencies at:
// - services/auth.service.js;
// - auth/auth.routes.js;
// - auth/auth.run.js;
// - auth/login/login.component.js;
// - shared/shared.routes.js;
// - shared/logout/logout.component.js.

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import services from '../services';
import shared from '../shared';

import loginComponent from './login/login.component.js';
import routesConfig from './auth.routes.js';
import runConfig from './auth.run.js';

export default angular
    .module('auth', [uiRouter, services, shared])
    .component('login', loginComponent)
    .config(routesConfig)
    .run(runConfig)
    .name;
