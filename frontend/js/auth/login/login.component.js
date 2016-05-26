'use strict';
import template from './login.html';

let loginComponent = {
    bindings: {},
    template,
    controller: LoginController
};

function LoginController(AuthService, $state) {
    this.isInvalidLoginOrPassword = false;

    this.isLoadingIndicatorActive = false;

    this.checkUser = function(user) {
        this.isLoadingIndicatorActive = true;

        AuthService.authWithPassword(user)
            .then(() => {
                this.isInvalidLoginOrPassword = false;
                $state.go('message-list', {boxId: 'inbox'});
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
                this.isInvalidLoginOrPassword = true;
                this.isLoadingIndicatorActive = false;
            });

    }
}

export default loginComponent;