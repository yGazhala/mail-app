'use strict';

import template from './logout.html';

let logoutComponent = {
    bindings: {},
    template: template,
    controller: LogoutController
};

function LogoutController(AuthService, $state) {
    this.logout = function() {
        AuthService.logout();
        $state.go('login');
    }
}

export default logoutComponent;
