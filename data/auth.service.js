'use strict';
angular
    .module('services')
    .service('AuthService', AuthService);

function AuthService($firebaseAuth) {
    var ref = new Firebase('https://gazhala.firebaseio.com');

    // This authObj returned by $firebaseAuth contains several methods
    // for authenticating users, responding to changes in authentication state,
    // and managing user accounts for email / password users.
    // For more information, please, follow to:
    // https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-users-and-authentication
    this.authObj = $firebaseAuth(ref);
}