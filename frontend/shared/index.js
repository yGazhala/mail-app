'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import services from '../services';

import PageMaskService from './page-mask/page-mask.service.js';
import pageMaskComponent from './page-mask/page-mask.component.js';
import layoutComponent from './layout/layout.component.js';
import routingConfig from './index.route.js';

export default angular
    .module('shared', [uiRouter, services])
    .service('PageMaskService', PageMaskService)
    .component('pageMask', pageMaskComponent)
    .component('layout', layoutComponent)
    .config(routingConfig)
    .name;
