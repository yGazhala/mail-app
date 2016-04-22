'use strict';
import template from 'login.html';

let loginComponent = {
    bindings: {},
    template,
    controller: LoginController
};

function LoginController(AuthService, $state) {

    // helper flag for the ng-if directive at the login.html
    this.isInvalidLoginOrPassword = false;

    this.checkUser = function(user) {

        AuthService.authObj.$authWithPassword(user)
            .then(() => {
                this.isInvalidLoginOrPassword = false;
                $state.go('message-list', {boxId: 'inbox'});
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
                this.isInvalidLoginOrPassword = true;
            });

    }
}

export default loginComponent;