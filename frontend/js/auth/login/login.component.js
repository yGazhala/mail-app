'use strict';
import template from './login.html';

let LoginController = ['AuthService', '$state', function (AuthService, $state) {
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
}];

let loginComponent = {
    bindings: {},
    template,
    controller: LoginController
};

export default loginComponent;