'use strict';
import template from './layout.html';

let layoutComponent = {
    bindings: {},
    template,
    controller: LayoutController
};

function LayoutController(AuthService, $state) {
    this.logout = function() {
        AuthService.logout();
        $state.go('login');
    }
}

export default layoutComponent;