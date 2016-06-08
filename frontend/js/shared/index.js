'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import services from '../services';

import PageMaskService from './page-mask/page-mask.service.js';
import pageMaskComponent from './page-mask/page-mask.component.js';
import layoutComponent from './layout/layout.component.js';
import NavStatusService from './nav-status/nav-status.service.js';
import navStatusComponent from './nav-status/nav-status.component.js';
import navBarComponent from './nav-bar/nav-bar.component.js';
import loadingIndicatorComponent from './loading-indicator/loading-indicator.component.js';
import routerConfig from './shared.routes.js';

export default angular
    .module('shared', [uiRouter, services])
    .service('PageMaskService', PageMaskService)
    .component('pageMask', pageMaskComponent)
    .component('layout', layoutComponent)
    .service('NavStatusService', NavStatusService)
    .component('navStatus', navStatusComponent)
    .component('navBar', navBarComponent)
    .component('loadingIndicator', loadingIndicatorComponent)
    .config(routerConfig)
    .name;
