'use strict';

import angular from 'angular';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';

import services from '../services';

import mailBoxComponent from './mail-box.component.js';
import composeComponent from './compose/compose.component.js';
import messageListComponent from './message-list/message-list.component.js';
import messageComponent from './message/message.component.js';
import trashListComponent from './trash-list/trash-list.component.js';
import trashDetailsComponent from './trash-details/trash-details.component.js';

import routingConfig from './index.route.js';

export default angular
    .module('mailBox', [ngMessages, uiRouter, services])
    .component('mailBox', mailBoxComponent)
    .component('compose', composeComponent)
    .component('messageList', messageListComponent)
    .component('message', messageComponent)
    .component('trashList', trashListComponent)
    .component('trashDetails', trashDetailsComponent)
    .config(routingConfig);
