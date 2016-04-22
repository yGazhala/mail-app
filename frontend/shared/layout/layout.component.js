'use strict';
import template from './layout.html';

let layoutComponent = {
    bindings: {},
    template: template,
    controller: LayoutController
};

function LayoutController(AuthService, $state) {
    this.logout = function() {
        AuthService.authObj.$unauth();
        $state.go('login');
    }
}

export default layoutComponent;