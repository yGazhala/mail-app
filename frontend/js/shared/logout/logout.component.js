'use strict';

import template from './logout.html';

let logoutComponent = {
    bindings: {},
    template: template,
    controller: LogoutController
};

LogoutController.$inject = ['AuthService', '$state'];
function LogoutController(AuthService, $state) {
    this.logout = function() {
        AuthService.logout();
        $state.go('login');
    }
}

export default logoutComponent;
