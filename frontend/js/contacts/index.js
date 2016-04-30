'use strict';

import angular from 'angular';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';

import services from '../services';
import shared from '../shared';

import contactsListComponent from './contacts-list/contacts-list.component.js';
import addUserFormComponent from './add-user-form/add-user-form.component.js';
import userCardComponent from './user-card/user-card.component.js';
import userEditFormComponent from './user-edit-form/user-edit-form.component.js';

import routingConfig from './route.js';

export default angular
    .module('contacts', [ngMessages, uiRouter, services, shared])
    .component('contactsList', contactsListComponent)
    .component('addUserForm', addUserFormComponent)
    .component('userCard', userCardComponent)
    .component('userEditForm', userEditFormComponent)
    .config(routingConfig)
    .name;
