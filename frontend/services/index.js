'use strict';
// This module provides data services for the entire application
import angular from 'angular';

// The AngularFire library needs the additional Firebase library, therefore,
// we import it to the scope of AngularFire. Keep in mind,
// that we must not inject the Firebase to the angular module itself.
// We have to inject only AngularFire to the module.
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
    .service('MailDataService', MailDataService)
    .constant('FIREBASE_URI', 'https://gazhala.firebaseio.com')
    .constant('FIREBASE_SECRET', '?auth=8EkruGOhqgy8x3V8Zyma3abWFaz70EnPjhTeX2KU')
    .name;