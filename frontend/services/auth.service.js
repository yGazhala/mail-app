'use strict';
// This service implements user's authentication, provided by $firebaseAuth.
// This service is used by auth module and mail-box module.

export default function AuthService($firebaseAuth) {
    let ref = new Firebase('https://gazhala.firebaseio.com');

    // This authObj returned by $firebaseAuth contains several methods
    // for authenticating users, responding to changes in authentication state,
    // and managing user accounts for email / password users.
    // For more information, please, follow to:
    // https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-users-and-authentication
    this.authObj = $firebaseAuth(ref);

    this.authWithPassword = function(user) {
        return this.authObj.$authWithPassword(user);
    };

    this.unauth = function() {
        return this.authObj.$unauth();
    }
}