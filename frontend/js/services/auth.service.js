'use strict';
// This service implements user's authentication, provided by $firebaseAuth.
// This service is used by:
// - auth/index.js;
// - auth/route.js;
// - auth/login/login.component.js;
// - shared/route.js;
// - shared/logout/logout.component.js.

/*@ngInject*/
export default function AuthService($firebaseAuth, FIREBASE_URI) {
    let ref = new Firebase(FIREBASE_URI);

    // This authObj returned by $firebaseAuth contains several methods
    // for authenticating users, responding to changes in authentication state,
    // and managing user accounts for email / password users.
    // For more information, please, follow to:
    // https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-users-and-authentication
    this._authObj = $firebaseAuth(ref);

    this.authWithPassword = function(user) {
        return this._authObj.$authWithPassword(user);
    };

    this.logout = function() {
        return this._authObj.$unauth();
    };

    this.requireAuth = function() {
        return this._authObj.$requireAuth();
    };

    this.waitForAuth = function() {
        return this._authObj.$waitForAuth();
    };
}