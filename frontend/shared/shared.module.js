'use strict';
import PageMaskService from 'page-mask.service.js';
import pageMaskComponent from 'page-mask.component.js';
import layoutComponent from 'layout.component.js';
import sharedRoute from 'shared.route.js';

angular
    .module('shared', ['ui.router', 'services'])
    .service('PageMaskService', PageMaskService)
    .component('pageMask', pageMaskComponent)
    .component('layout', layoutComponent)
    .config(sharedRoute);
