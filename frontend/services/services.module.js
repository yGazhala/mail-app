'use strict';
import NormalizeToArrayFactory from 'normalize-to-array.factory.js';
import AuthService from 'auth.service.js';
import ContactsService from 'contacts.service.js';
import MailDataService from 'contacts.service.js';

angular
    .module('services', ['firebase'])
    .factory('NormalizeToArrayFactory', NormalizeToArrayFactory)
    .service('AuthService', AuthService)
    .service('ContactsService', ContactsService)
    .service('MailDataService', MailDataService);