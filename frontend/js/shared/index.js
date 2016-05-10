'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import services from '../services';

import PageMaskService from './page-mask/page-mask.service.js';
import pageMaskComponent from './page-mask/page-mask.component.js';
import layoutComponent from './layout/layout.component.js';
import logoutComponent from './logout/logout.component.js';
import NavStatusService from './nav-status/nav-status.service.js';
import navStatusComponent from './nav-status/nav-status.component.js';
import routingConfig from './route.js';

export default angular
    .module('shared', [uiRouter, services])
    .service('PageMaskService', PageMaskService)
    .component('pageMask', pageMaskComponent)
    .component('layout', layoutComponent)
    .component('logout', logoutComponent)
    .service('NavStatusService', NavStatusService)
    .component('navStatus', navStatusComponent)
    .config(routingConfig)
    .name;
