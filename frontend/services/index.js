'use strict';
// This module provides data services for the entire application
import angular from 'angular';
import Firebase from 'firebase';
import AngularFire from 'angularfire';

import NormalizeToArrayFactory from './normalize-to-array.factory.js';
import AuthService from './auth.service.js';
import ContactsService from './contacts.service.js';
import MailDataService from './mail-data.service.js';

export default angular
    .module('services', [AngularFire])
    .factory('NormalizeToArrayFactory', NormalizeToArrayFactory)
    .service('AuthService', AuthService)
    .service('ContactsService', ContactsService)
    .service('MailDataService', MailDataService);